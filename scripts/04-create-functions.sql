-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    agency_uuid UUID;
BEGIN
    -- Create a new agency for the user
    INSERT INTO public.agencies (name)
    VALUES (COALESCE(NEW.raw_user_meta_data->>'agency_name', 'My Agency'))
    RETURNING id INTO agency_uuid;
    
    -- Create the user profile
    INSERT INTO public.profiles (user_id, agency_id, full_name, role)
    VALUES (
        NEW.id,
        agency_uuid,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        'Admin'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get dashboard metrics for an agency
CREATE OR REPLACE FUNCTION get_dashboard_metrics(agency_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_revenue', COALESCE(SUM(CASE WHEN metric_type = 'revenue' THEN value END), 0),
        'total_users', COALESCE(SUM(CASE WHEN metric_type = 'users' THEN value END), 0),
        'total_conversions', COALESCE(SUM(CASE WHEN metric_type = 'conversions' THEN value END), 0),
        'avg_growth', COALESCE(AVG(CASE WHEN metric_type = 'growth' THEN value END), 0)
    ) INTO result
    FROM metrics
    WHERE agency_id = agency_uuid
    AND date >= CURRENT_DATE - INTERVAL '30 days';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Agencies policies
CREATE POLICY "Users can view their own agency" ON agencies
    FOR SELECT USING (
        id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own agency" ON agencies
    FOR UPDATE USING (
        id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid() AND role = 'Admin'
        )
    );

-- Profiles policies
CREATE POLICY "Users can view profiles in their agency" ON profiles
    FOR SELECT USING (
        agency_id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Metrics policies
CREATE POLICY "Users can view metrics for their agency" ON metrics
    FOR SELECT USING (
        agency_id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert metrics for their agency" ON metrics
    FOR INSERT WITH CHECK (
        agency_id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

-- Campaigns policies
CREATE POLICY "Users can view campaigns for their agency" ON campaigns
    FOR SELECT USING (
        agency_id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage campaigns for their agency" ON campaigns
    FOR ALL USING (
        agency_id IN (
            SELECT agency_id FROM profiles 
            WHERE user_id = auth.uid()
        )
    );

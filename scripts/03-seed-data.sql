-- Insert sample agencies
INSERT INTO agencies (id, name) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'Digital Growth Agency'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Creative Marketing Co.'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Pixel Perfect Agency')
ON CONFLICT (id) DO NOTHING;

-- Insert sample metrics for the first agency
INSERT INTO metrics (agency_id, date, metric_type, value) VALUES 
    -- Revenue data
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-01', 'revenue', 4000),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-02', 'revenue', 3000),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-03', 'revenue', 2000),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-04', 'revenue', 2780),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-05', 'revenue', 1890),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-06', 'revenue', 2390),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-07', 'revenue', 3490),
    
    -- Users data
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-01', 'users', 2400),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-02', 'users', 1398),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-03', 'users', 9800),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-04', 'users', 3908),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-05', 'users', 4800),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-06', 'users', 3800),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-07', 'users', 4300),
    
    -- Conversions data
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-01', 'conversions', 42),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-02', 'conversions', 38),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-03', 'conversions', 65),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-04', 'conversions', 28),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-05', 'conversions', 95),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-06', 'conversions', 52),
    ('550e8400-e29b-41d4-a716-446655440001', '2024-01-07', 'conversions', 73)
ON CONFLICT DO NOTHING;

-- Insert sample campaigns
INSERT INTO campaigns (agency_id, name, channel, status, start_date, impressions, clicks, conversions, revenue) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'Summer Sale 2024', 'Google Ads', 'Active', '2024-01-01', 12500, 850, 42, 2100.50),
    ('550e8400-e29b-41d4-a716-446655440001', 'Brand Awareness', 'Facebook Ads', 'Active', '2024-01-02', 8900, 320, 18, 900.25),
    ('550e8400-e29b-41d4-a716-446655440001', 'Product Launch', 'Instagram Ads', 'Completed', '2024-01-03', 15600, 1200, 65, 3250.75),
    ('550e8400-e29b-41d4-a716-446655440001', 'Retargeting Campaign', 'Google Ads', 'Active', '2024-01-04', 5400, 480, 28, 1400.00),
    ('550e8400-e29b-41d4-a716-446655440001', 'Email Newsletter', 'Email', 'Completed', '2024-01-05', 25000, 2100, 95, 4750.25)
ON CONFLICT DO NOTHING;

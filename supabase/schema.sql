-- Supabase Database Schema for Photography Landing Page
-- Run this in the Supabase SQL Editor to create the required tables

-- Services table (for dynamic pricing)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- Insert default settings (optional)
INSERT INTO settings (key, value) VALUES
  ('site_name', 'Melody'),
  ('logo_url', ''),
  ('site_url', ''),
  ('contact_email', ''),
  ('phone', ''),
  ('instagram', ''),
  ('pinterest', ''),
  ('linkedin', ''),
  ('behance', '')
ON CONFLICT (key) DO NOTHING;

-- Insert sample services (optional - remove if not needed)
INSERT INTO services (name, description, price, category) VALUES
  ('Portrait Session', 'Professional portrait photography for individuals or couples. Includes 1-hour session and 20 edited photos.', 250.00, 'portrait'),
  ('Wedding Package', 'Full day wedding coverage with 2 photographers. Includes 500+ edited photos and online gallery.', 2500.00, 'wedding'),
  ('Fashion Editorial', 'Creative fashion shoots for portfolios or brands. Includes 2-hour session and 30 edited photos.', 500.00, 'fashion'),
  ('Event Coverage', 'Professional photography for corporate events, parties, and celebrations.', 800.00, 'event')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - Important for production
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to services and settings
CREATE POLICY "Allow public read access to services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to settings" ON settings
  FOR SELECT USING (true);

-- For admin operations, you would need authenticated policies
-- Example (requires Supabase Auth setup):
-- CREATE POLICY "Allow authenticated users to manage services" ON services
--   FOR ALL USING (auth.role() = 'authenticated');

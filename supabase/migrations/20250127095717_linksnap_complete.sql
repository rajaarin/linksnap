-- Location: supabase/migrations/20250127095717_linksnap_complete.sql
-- Schema Analysis: New project with complete link shortening system
-- Integration Type: Complete new system with authentication and subscriptions
-- Dependencies: New tables for user management, links, and subscriptions

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('admin', 'user');
CREATE TYPE public.subscription_plan AS ENUM ('basic', 'premium');
CREATE TYPE public.link_status AS ENUM ('active', 'expired', 'disabled');

-- Critical intermediary table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    subscription_plan public.subscription_plan DEFAULT 'basic'::public.subscription_plan,
    subscription_expires_at TIMESTAMPTZ,
    links_created INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Short links table
CREATE TABLE public.short_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    short_code TEXT NOT NULL UNIQUE,
    custom_alias TEXT,
    title TEXT,
    description TEXT,
    clicks INTEGER DEFAULT 0,
    status public.link_status DEFAULT 'active'::public.link_status,
    password_hash TEXT,
    expires_at TIMESTAMPTZ,
    qr_code_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Click analytics table
CREATE TABLE public.link_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    link_id UUID REFERENCES public.short_links(id) ON DELETE CASCADE,
    clicked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_short_links_user_id ON public.short_links(user_id);
CREATE INDEX idx_short_links_short_code ON public.short_links(short_code);
CREATE INDEX idx_short_links_status ON public.short_links(status);
CREATE INDEX idx_link_clicks_link_id ON public.link_clicks(link_id);
CREATE INDEX idx_link_clicks_clicked_at ON public.link_clicks(clicked_at);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.short_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- 4. Safe Helper Functions
CREATE OR REPLACE FUNCTION public.is_link_owner(link_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.short_links sl
    WHERE sl.id = link_uuid AND sl.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.has_premium_subscription()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() 
    AND up.subscription_plan = 'premium'::public.subscription_plan
    AND (up.subscription_expires_at IS NULL OR up.subscription_expires_at > NOW())
)
$$;

CREATE OR REPLACE FUNCTION public.can_create_link()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() 
    AND (
        up.subscription_plan = 'premium'::public.subscription_plan
        OR up.links_created < 3
    )
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment link count
CREATE OR REPLACE FUNCTION public.increment_link_count()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.user_profiles 
  SET links_created = links_created + 1,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

-- Trigger for link creation
CREATE TRIGGER on_link_created
  AFTER INSERT ON public.short_links
  FOR EACH ROW EXECUTE FUNCTION public.increment_link_count();

-- Function to update click count
CREATE OR REPLACE FUNCTION public.update_click_count()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.short_links 
  SET clicks = clicks + 1,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.link_id;
  RETURN NEW;
END;
$$;

-- Trigger for click tracking
CREATE TRIGGER on_click_recorded
  AFTER INSERT ON public.link_clicks
  FOR EACH ROW EXECUTE FUNCTION public.update_click_count();

-- 5. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "users_manage_own_links" ON public.short_links FOR ALL
USING (public.is_link_owner(id)) WITH CHECK (public.is_link_owner(id));

CREATE POLICY "public_can_view_active_links" ON public.short_links FOR SELECT
TO public
USING (status = 'active'::public.link_status);

CREATE POLICY "users_view_own_clicks" ON public.link_clicks FOR SELECT
USING (public.is_link_owner(link_id));

CREATE POLICY "system_can_insert_clicks" ON public.link_clicks FOR INSERT
TO public
WITH CHECK (true);

-- 6. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    link1_uuid UUID := gen_random_uuid();
    link2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@linksnap.co', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@linksnap.co', crypt('user123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Premium User", "role": "user"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Update user profile for premium subscription
    UPDATE public.user_profiles 
    SET subscription_plan = 'premium'::public.subscription_plan,
        subscription_expires_at = NOW() + INTERVAL '1 year'
    WHERE id = user_uuid;

    -- Create sample short links
    INSERT INTO public.short_links (id, user_id, original_url, short_code, title, clicks) VALUES
        (link1_uuid, admin_uuid, 'https://example.com/very-long-url-that-needs-shortening', 'abc123', 'Example Website', 45),
        (link2_uuid, user_uuid, 'https://github.com/user/awesome-project', 'gh456', 'Awesome GitHub Project', 128);

    -- Create sample click analytics
    INSERT INTO public.link_clicks (link_id, ip_address, user_agent, referrer, country, device_type, browser) VALUES
        (link1_uuid, '192.168.1.1'::inet, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'https://google.com', 'United States', 'Desktop', 'Chrome'),
        (link2_uuid, '10.0.0.1'::inet, 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)', 'https://twitter.com', 'Canada', 'Mobile', 'Safari');

END $$;
-- Supabase Schema Setup

-- 1. Create the `admin_users` table
CREATE TABLE public.admin_users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    role text DEFAULT 'admin' NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the `configuration` table
CREATE TABLE public.configuration (
    id text PRIMARY KEY,
    discord text,
    mail text,
    documentation text,
    github text,
    website text,
    youtube text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the `products` table
CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    "shortDescription" text,
    description text,
    price numeric NOT NULL DEFAULT 0,
    category text NOT NULL,
    image text,
    gallery text[],
    features text[],
    requirements text[],
    frameworks text[],
    "productLink" text,
    license text,
    changelog jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the `faq` table
CREATE TABLE public.faq (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    question text NOT NULL,
    answer text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Setup Storage Bucket for `products`
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Authenticated Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'products');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'products');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'products');

-- Optionally, insert a main configuration record
INSERT INTO public.configuration (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;

-- Optionally, create a default admin (Remember to change this password in production!)
-- INSERT INTO public.admin_users (username, password, role) VALUES ('admin', 'password', 'admin');

-- 6. Enable Row Level Security (RLS)
-- This ensures that the anon key cannot access or modify these tables.
-- The Next.js server actions use the Service Role Key, which bypasses RLS.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;

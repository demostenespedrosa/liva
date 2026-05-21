-- ==========================================
-- LIVA - Supabase Schema with RLS and Security
-- ==========================================

-- Enable pgcrypto for UUIDs and Encryption if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Psychologists (Therapists) Table
CREATE TABLE IF NOT EXISTS public.psychologists (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    bio TEXT,
    focus TEXT,
    photo_url TEXT,
    phone TEXT,
    tags TEXT[] DEFAULT '{}',
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'trialing',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    psychologist_id UUID NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    psychologist_id UUID NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'scheduled', -- scheduled, completed, canceled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Clinical Records (Prontuário Eletrônico do Paciente - PEP)
-- Sensitive data: Content can be encrypted at the application layer or using pgcrypto functions
CREATE TABLE IF NOT EXISTS public.clinical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    psychologist_id UUID NOT NULL REFERENCES public.psychologists(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    -- We assume the content is encrypted by the client app before inserting,
    -- or encrypted at rest by the DB (Supabase provides transit & rest encryption by default)
    encrypted_content TEXT NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.psychologists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_records ENABLE ROW LEVEL SECURITY;


-- Psychologists Table Policies:
-- 1. Public can read psychologists IF is_public is true
CREATE POLICY "Public profiles are viewable by everyone" ON public.psychologists
    FOR SELECT USING (is_public = true);

-- 2. Psychologists can view and edit their own profiles
CREATE POLICY "Psychologists can read own profile" ON public.psychologists
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Psychologists can update own profile" ON public.psychologists
    FOR UPDATE USING (auth.uid() = id);

-- (Insert is usually handled via Trigger upon auth.users creation)


-- Patients Table Policies:
-- 1. Psychologists can only view, insert, update their OWN patients
CREATE POLICY "Psychologists manage their own patients" ON public.patients
    FOR ALL USING (auth.uid() = psychologist_id);


-- Appointments Table Policies:
-- 1. Psychologists can only manage their own appointments
CREATE POLICY "Psychologists manage their own appointments" ON public.appointments
    FOR ALL USING (auth.uid() = psychologist_id);


-- Clinical Records Table Policies (Strictest RLS):
-- 1. Only the owner psychologist can interact with the records.
-- (No public access, no patient access)
CREATE POLICY "Strict access for clinical records owner only" ON public.clinical_records
    FOR ALL USING (auth.uid() = psychologist_id);

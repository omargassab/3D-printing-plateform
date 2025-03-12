-- Fix the recursive policy issue by dropping and recreating policies

-- First, disable RLS temporarily to avoid issues
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be causing recursion
DROP POLICY IF EXISTS "Public users are viewable by everyone." ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.users;
DROP POLICY IF EXISTS "Users can update own profile." ON public.users;

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create simplified policies that avoid recursion
CREATE POLICY "Public users are viewable by everyone"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
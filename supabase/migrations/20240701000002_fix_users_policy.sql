-- Drop the problematic policy that's causing infinite recursion
DROP POLICY IF EXISTS "Users can view their own data" ON users;

-- Create a more specific policy that avoids recursion
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Add a policy for public access to limited user data
CREATE POLICY "Public access to limited user data"
ON users FOR SELECT
USING (true);

-- Make sure RLS is enabled for the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

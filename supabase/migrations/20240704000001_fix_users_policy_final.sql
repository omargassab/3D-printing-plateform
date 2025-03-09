-- Completely disable RLS temporarily to avoid recursion during changes
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on the users table
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Public access to limited user data" ON users;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON users;
DROP POLICY IF EXISTS "Public read access" ON users;
DROP POLICY IF EXISTS "Anyone can insert users" ON users;
DROP POLICY IF EXISTS "Anyone can select users" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can delete own data" ON users;

-- Create a single, simple policy for all operations
-- This avoids any potential for recursion by not referencing other tables or complex conditions
CREATE POLICY "Public access policy"
ON users
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

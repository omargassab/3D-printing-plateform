-- First, disable RLS temporarily to avoid recursion during policy changes
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on the users table
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Public access to limited user data" ON users;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON users;
DROP POLICY IF EXISTS "Public read access" ON users;

-- Create a simple policy for INSERT that doesn't reference the users table
CREATE POLICY "Anyone can insert users"
ON users
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create a simple policy for SELECT that doesn't cause recursion
CREATE POLICY "Anyone can select users"
ON users
FOR SELECT
TO authenticated, anon
USING (true);

-- Create a policy for UPDATE that only allows users to update their own data
CREATE POLICY "Users can update own data"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a policy for DELETE that only allows users to delete their own data
CREATE POLICY "Users can delete own data"
ON users
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

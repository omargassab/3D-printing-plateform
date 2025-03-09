-- Drop all existing policies on the users table to prevent recursion issues
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Public access to limited user data" ON users;

-- Create a simple policy that allows all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users"
ON users
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create a policy that allows public read access to user data
-- This avoids the recursion by not referencing the users table in its own policy
CREATE POLICY "Public read access"
ON users
FOR SELECT
USING (true);

-- Create admin user in auth.users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at)
VALUES (
  gen_random_uuid(),
  'admin@3dprintmarket.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"], "account_type": "admin"}',
  '{"first_name": "Admin", "last_name": "User", "account_type": "admin"}',
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Create corresponding user in public.users table
INSERT INTO public.users (id, email, first_name, last_name, account_type)
SELECT 
  id,
  email,
  raw_user_meta_data->>'first_name' as first_name,
  raw_user_meta_data->>'last_name' as last_name,
  raw_app_meta_data->>'account_type' as account_type
FROM auth.users 
WHERE email = 'admin@3dprintmarket.com'
ON CONFLICT (id) DO NOTHING;
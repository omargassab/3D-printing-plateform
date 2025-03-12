-- Create real designer accounts
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'youssef@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Youssef","last_name":"Ben Ali","account_type":"designer"}'),
  ('00000000-0000-0000-0000-000000000002', 'leila@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Leila","last_name":"Mansour","account_type":"designer"}'),
  ('00000000-0000-0000-0000-000000000003', 'karim@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Karim","last_name":"Trabelsi","account_type":"designer"}'),
  ('00000000-0000-0000-0000-000000000004', 'amira@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Amira","last_name":"Belhaj","account_type":"designer"}'),
  ('00000000-0000-0000-0000-000000000005', 'mehdi@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Mehdi","last_name":"Khelifi","account_type":"designer"}'),
  ('00000000-0000-0000-0000-000000000006', 'nizar@3dprintmarket.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"],"account_type":"designer"}', '{"first_name":"Nizar","last_name":"Chaabane","account_type":"designer"}');

-- Create corresponding user profiles
INSERT INTO public.users (id, first_name, last_name, email, account_type, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Youssef', 'Ben Ali', 'youssef@3dprintmarket.com', 'designer', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Leila', 'Mansour', 'leila@3dprintmarket.com', 'designer', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'Karim', 'Trabelsi', 'karim@3dprintmarket.com', 'designer', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'Amira', 'Belhaj', 'amira@3dprintmarket.com', 'designer', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000005', 'Mehdi', 'Khelifi', 'mehdi@3dprintmarket.com', 'designer', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000006', 'Nizar', 'Chaabane', 'nizar@3dprintmarket.com', 'designer', NOW(), NOW());
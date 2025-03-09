-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('designer', 'dropshipper', 'admin', 'customer')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create designs table
CREATE TABLE IF NOT EXISTS designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  designer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create design_files table
CREATE TABLE IF NOT EXISTS design_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create design_images table
CREATE TABLE IF NOT EXISTS design_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create design_materials table
CREATE TABLE IF NOT EXISTS design_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  material TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dropshipper_products table
CREATE TABLE IF NOT EXISTS dropshipper_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dropshipper_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(dropshipper_id, design_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipping_method TEXT NOT NULL DEFAULT 'standard',
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'printing', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  design_id UUID NOT NULL REFERENCES designs(id),
  dropshipper_id UUID REFERENCES users(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  designer_royalty DECIMAL(10, 2) NOT NULL,
  dropshipper_profit DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create royalty_payments table
CREATE TABLE IF NOT EXISTS royalty_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create royalty_payment_items table
CREATE TABLE IF NOT EXISTS royalty_payment_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id UUID NOT NULL REFERENCES royalty_payments(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('order', 'profile', 'system', 'design')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE dropshipper_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE royalty_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE royalty_payment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can view their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" 
  ON users FOR SELECT 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND account_type = 'admin'));

CREATE POLICY "Users can update their own data" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Designs policies
CREATE POLICY "Anyone can view active designs" 
  ON designs FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Designers can view their own designs" 
  ON designs FOR SELECT 
  USING (designer_id = auth.uid());

CREATE POLICY "Admins can view all designs" 
  ON designs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND account_type = 'admin'));

CREATE POLICY "Designers can insert their own designs" 
  ON designs FOR INSERT 
  WITH CHECK (designer_id = auth.uid());

CREATE POLICY "Designers can update their own designs" 
  ON designs FOR UPDATE 
  USING (designer_id = auth.uid());

-- Design files policies
CREATE POLICY "Anyone can view design files for active designs" 
  ON design_files FOR SELECT 
  USING (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND is_active = true));

CREATE POLICY "Designers can view their own design files" 
  ON design_files FOR SELECT 
  USING (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND designer_id = auth.uid()));

CREATE POLICY "Designers can insert files for their designs" 
  ON design_files FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND designer_id = auth.uid()));

-- Design images policies
CREATE POLICY "Anyone can view design images" 
  ON design_images FOR SELECT 
  USING (true);

CREATE POLICY "Designers can insert images for their designs" 
  ON design_images FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND designer_id = auth.uid()));

-- Dropshipper products policies
CREATE POLICY "Anyone can view active dropshipper products" 
  ON dropshipper_products FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Dropshippers can view their own products" 
  ON dropshipper_products FOR SELECT 
  USING (dropshipper_id = auth.uid());

CREATE POLICY "Dropshippers can insert their own products" 
  ON dropshipper_products FOR INSERT 
  WITH CHECK (dropshipper_id = auth.uid());

CREATE POLICY "Dropshippers can update their own products" 
  ON dropshipper_products FOR UPDATE 
  USING (dropshipper_id = auth.uid());

-- Orders policies
CREATE POLICY "Customers can view their own orders" 
  ON orders FOR SELECT 
  USING (customer_id = auth.uid());

CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND account_type = 'admin'));

CREATE POLICY "Customers can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Admins can update any order" 
  ON orders FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND account_type = 'admin'));

-- Order items policies
CREATE POLICY "Customers can view their own order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND customer_id = auth.uid()));

CREATE POLICY "Designers can view order items for their designs" 
  ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND designer_id = auth.uid()));

CREATE POLICY "Dropshippers can view order items for their products" 
  ON order_items FOR SELECT 
  USING (dropshipper_id = auth.uid());

CREATE POLICY "Admins can view all order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND account_type = 'admin'));

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (user_id = auth.uid());

-- Enable realtime for relevant tables
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;

/*
  # Initial Schema for Personal Finance Manager

  1. New Tables
    - users (managed by Supabase Auth)
    - categories
      - id: Primary key
      - name: Category name
      - type: 'INCOME' or 'EXPENSE'
      - user_id: Reference to auth.users
    - transactions
      - id: Primary key
      - amount: Decimal amount
      - date: Transaction date
      - category_id: Reference to categories
      - description: Optional description
      - user_id: Reference to auth.users
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user-specific data access
*/

-- Create custom types
CREATE TYPE transaction_category_type AS ENUM ('INCOME', 'EXPENSE');

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type transaction_category_type NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(name, user_id)
);

-- Create transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DECIMAL(12,2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category_id UUID NOT NULL REFERENCES categories(id),
    description TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own categories"
    ON categories
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own transactions"
    ON transactions
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

-- Create default categories function
CREATE OR REPLACE FUNCTION create_default_categories(user_id UUID)
RETURNS void AS $$
BEGIN
    -- Income categories
    INSERT INTO categories (name, type, user_id) VALUES
    ('Salary', 'INCOME', user_id),
    ('Freelance', 'INCOME', user_id),
    ('Investments', 'INCOME', user_id);

    -- Expense categories
    INSERT INTO categories (name, type, user_id) VALUES
    ('Food', 'EXPENSE', user_id),
    ('Transport', 'EXPENSE', user_id),
    ('Housing', 'EXPENSE', user_id),
    ('Utilities', 'EXPENSE', user_id),
    ('Healthcare', 'EXPENSE', user_id),
    ('Entertainment', 'EXPENSE', user_id);
END;
$$ LANGUAGE plpgsql;
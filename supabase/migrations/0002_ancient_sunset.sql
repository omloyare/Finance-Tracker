/*
  # Add default categories trigger

  1. Changes
    - Create a trigger to automatically create default categories for new users
    - Insert default categories when a user signs up

  2. Categories Added
    Income categories:
    - Salary
    - Freelance
    - Investments
    - Other Income

    Expense categories:
    - Food & Dining
    - Transportation
    - Housing
    - Utilities
    - Healthcare
    - Entertainment
    - Shopping
    - Education
    - Travel
    - Other Expenses
*/

-- Create trigger function to add default categories
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Income Categories
  INSERT INTO public.categories (name, type, user_id)
  VALUES
    ('Salary', 'INCOME', NEW.id),
    ('Freelance', 'INCOME', NEW.id),
    ('Investments', 'INCOME', NEW.id),
    ('Other Income', 'INCOME', NEW.id);

  -- Expense Categories
  INSERT INTO public.categories (name, type, user_id)
  VALUES
    ('Food & Dining', 'EXPENSE', NEW.id),
    ('Transportation', 'EXPENSE', NEW.id),
    ('Housing', 'EXPENSE', NEW.id),
    ('Utilities', 'EXPENSE', NEW.id),
    ('Healthcare', 'EXPENSE', NEW.id),
    ('Entertainment', 'EXPENSE', NEW.id),
    ('Shopping', 'EXPENSE', NEW.id),
    ('Education', 'EXPENSE', NEW.id),
    ('Travel', 'EXPENSE', NEW.id),
    ('Other Expenses', 'EXPENSE', NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
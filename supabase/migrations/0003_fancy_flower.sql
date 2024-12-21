/*
  # Add categories for existing users

  This migration adds default categories for any existing users who don't have categories yet.
*/

DO $$
DECLARE
    user_record auth.users%ROWTYPE;
BEGIN
    FOR user_record IN SELECT * FROM auth.users
    LOOP
        -- Check if user already has categories
        IF NOT EXISTS (SELECT 1 FROM categories WHERE user_id = user_record.id) THEN
            -- Income Categories
            INSERT INTO categories (name, type, user_id)
            VALUES
                ('Salary', 'INCOME', user_record.id),
                ('Freelance', 'INCOME', user_record.id),
                ('Investments', 'INCOME', user_record.id),
                ('Other Income', 'INCOME', user_record.id);

            -- Expense Categories
            INSERT INTO categories (name, type, user_id)
            VALUES
                ('Food & Dining', 'EXPENSE', user_record.id),
                ('Transportation', 'EXPENSE', user_record.id),
                ('Housing', 'EXPENSE', user_record.id),
                ('Utilities', 'EXPENSE', user_record.id),
                ('Healthcare', 'EXPENSE', user_record.id),
                ('Entertainment', 'EXPENSE', user_record.id),
                ('Shopping', 'EXPENSE', user_record.id),
                ('Education', 'EXPENSE', user_record.id),
                ('Travel', 'EXPENSE', user_record.id),
                ('Other Expenses', 'EXPENSE', user_record.id);
        END IF;
    END LOOP;
END $$;
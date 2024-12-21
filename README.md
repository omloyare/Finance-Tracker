Personal Finance Manager

This project is a Personal Finance Manager web application built with React Native for Web and Supabase for authentication and database integration. It is designed to help users manage their income and expenses effectively, visualize financial data, and generate reports.

Project Setup

This project is currently configured as a React Native for Web project using Supabase for backend services. It includes the following features:

Core Features

Income and Expense Tracking: Users can log transactions by selecting categories and entering details like amount, date, and type (income or expense).

Monthly Reports: Visualize income and expenses using charts for better financial planning.

Categorized Summaries: Break down transactions by category to see where money is spent or earned.

User Authentication: Secure login and registration using Supabase.

Date Filters: Filter transactions by custom date ranges for focused analysis.

Additional Features

Automatic Default Categories:

Income categories: Salary, Freelance, Investments, Other Income.

Expense categories: Food & Dining, Transportation, Housing, Utilities, Healthcare, Entertainment, Shopping, Education, Travel, Other Expenses.

These categories are added automatically for new users and can also be manually inserted for existing users.

Session Management: Persistent sessions for seamless user experience.

Error Handling and Loading States: Enhanced user experience with proper feedback mechanisms.

Development Steps

Initial Setup

Integrated Supabase for authentication and database.

Added migration files for setting up the database schema:

Categories table with default values for income and expenses.

Trigger for adding default categories when a new user signs up.

Components and Pages

Authentication Pages:

Login and Register forms.

Dashboard:

Transaction form for adding income or expenses.

Transaction list with real-time updates.

Summary section displaying total income, expenses, and bar charts.

Date filter component for filtering transactions.

Database Migrations

Added migrations for:

Creating the categories table.

Adding default categories for existing users.

Implementing triggers for automatic default category insertion.

Fixes and Updates

Populated the dropdown for selecting categories in the transaction form.

Enhanced transaction form validation and error handling.

Improved layout and organized components for better maintainability.

Running the Project

Clone the Repository:

git clone https://omloyare.github.io/Finance-Tracker/
cd personal-finance-manager

Install Dependencies:

npm install

Set Up Supabase:

Create a Supabase project.

Apply the provided migrations in the Supabase SQL editor.

Update src/lib/supabase.ts with your Supabase credentials.

Start the Development Server:

npm run dev

Open the app in your browser. You should see the login page.

Issues Addressed

Category Dropdown:

Populated the dropdown with categories fetched from the database.

Added default categories for new and existing users via migrations.

Grouped categories into "Income" and "Expense" types.

Transaction Functionality:

Fixed the add transaction feature with proper validation.

Ensured real-time updates in the transaction list.

Next Steps

Add category-wise breakdown charts.

Implement transaction search and advanced filtering.

Introduce a feature for exporting financial data as reports.

Improve accessibility and responsiveness for various devices.

Contact

For questions or contributions, please contact Om Loyare at omloyare2611@gmail.com.

Feel free to clone, use, or contribute to this project. Happy coding!

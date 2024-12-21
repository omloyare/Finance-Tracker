import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Database } from '../../types/supabase';

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'];
};

type Props = {
  transactions: Transaction[];
};

export default function Summary({ transactions }: Props) {
  const chartData = useMemo(() => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      
      if (transaction.categories.type === 'INCOME') {
        monthlyData[month].income += Number(transaction.amount);
      } else {
        monthlyData[month].expense += Number(transaction.amount);
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data,
    }));
  }, [transactions]);

  const totalIncome = useMemo(() => 
    transactions
      .filter(t => t.categories.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  , [transactions]);

  const totalExpense = useMemo(() => 
    transactions
      .filter(t => t.categories.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  , [transactions]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Financial Summary</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Total Income</p>
          <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">Total Expenses</p>
          <p className="text-2xl font-bold text-red-700">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#059669" name="Income" />
            <Bar dataKey="expense" fill="#DC2626" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
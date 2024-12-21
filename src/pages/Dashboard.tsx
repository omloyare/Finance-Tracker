import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useCategories } from '../hooks/useCategories';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Summary from '../components/dashboard/Summary';
import DateFilter from '../components/dashboard/DateFilter';
import type { Database } from '../types/supabase';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [dateFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('transactions')
        .select(`
          *,
          categories (*)
        `)
        .order('date', { ascending: false });

      if (dateFilter) {
        query = query
          .gte('date', dateFilter.start)
          .lte('date', dateFilter.end);
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setTransactions(data || []);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (start: string, end: string) => {
    setDateFilter({ start, end });
  };

  if (categoriesLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (categoriesError || error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{categoriesError || error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Personal Finance Manager</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DateFilter onFilterChange={handleDateFilter} />
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Summary transactions={transactions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Add Transaction</h2>
              <TransactionForm
                categories={categories}
                onSuccess={fetchTransactions}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
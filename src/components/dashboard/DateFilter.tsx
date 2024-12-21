import { useState } from 'react';

type Props = {
  onFilterChange: (startDate: string, endDate: string) => void;
};

export default function DateFilter({ onFilterChange }: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilterChange(startDate, endDate);
    }
  };

  return (
    <div className="flex gap-4 items-end mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Apply Filter
      </button>
    </div>
  );
}
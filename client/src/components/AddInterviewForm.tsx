import React, { useState } from 'react';

// Type definition for an interview
export type Interview = {
  id?: string;
  company: string;
  title: string;
  role: string;
  date: string;
  status: string;
  notes: string;
};

// Props interface for the component
interface AddFormProps {
  onAdd: (interview: Omit<Interview, '_id'>) => void;
}

const AddInterviewForm: React.FC<AddFormProps> = ({ onAdd }) => {
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Applied');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !title) return;

    onAdd({ company, title, role, date, status, notes });
    setCompany('');
    setTitle('');
    setRole('');
    setDate('');
    setNotes('');
    setStatus('Applied');
  };

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-1">
        <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Google"
          required
        />
      </div>
      <div className="col-span-1">
        <label htmlFor="title" className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Software Engineer"
          required
        />
      </div>
      <div className="col-span-1">
        <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Frontend Developer"
        />
      </div>
      <div className="col-span-1">
        <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="col-span-full">
        <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes (Optional)</label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Recruiter call on Tuesday"
        />
      </div>
      <div className="col-span-full">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Application
        </button>
      </div>
    </form>
  );
};

export default AddInterviewForm;

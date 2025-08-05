import React, { useEffect, useState } from 'react';
import InterviewList from './components/InterviewList';
import AddInterviewForm from './components/AddInterviewForm';
import axios from 'axios';

export interface Interview {
  _id: string | null | undefined;
  title: string;
  notes: any;
  company: string;
  role?: string;
  date: string;
  status: string;
}
// Props interface for the component
export interface InterviewListProps {
  interviews: Interview[];
  onUpdateStatus: (jobId: string, newStatus: string) => Promise<void>;
  statuses: string[];
}
// Main App Component
const App: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  // Mock User ID and statuses for UI purposes
  const userId = 'ui-only-user-id-12345';
  const statuses = ['Applied', 'Interviewing', 'Rejected', 'Offer'];
    useEffect(() => {
    axios.get('http://localhost:5000/interviews')
      .then(response => {
        setInterviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching interviews:', error);
      });
  }, []);

const addInterview = async (newInterview: Omit<Interview, '_id'>) => {
  try {
    const response = await axios.post('http://localhost:5000/interviews', newInterview);
    const savedInterview = response.data;
    setInterviews([savedInterview, ...interviews]);
  } catch (error) {
    console.error('Error adding interview:', error);
  }
};


const handleUpdateStatus = async (jobId: string, newStatus: string): Promise<void> => {
  try {
    await axios.put(`http://localhost:5000/interviews/${jobId}`, { status: newStatus });
    setInterviews(prev =>
      prev.map(interview =>
        interview._id === jobId ? { ...interview, status: newStatus } : interview
      )
    );
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">Tech Prep Tracker</h1>
          <p className="text-xl mt-2 font-medium">Track your job applications and stay organized.</p>
          <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Your User ID (for debugging/sharing): <span className="font-mono text-xs break-all">{userId}</span></p>
        </header>

        {/* --- Add New Job Form --- */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Add New Application</h2>
          <AddInterviewForm onAdd={addInterview} />
        </section>

        {/* --- Interview List --- */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <InterviewList interviews={interviews} onUpdateStatus={handleUpdateStatus} statuses={statuses} />
        </section>
      </div>
    </div>
  );
};

export default App;

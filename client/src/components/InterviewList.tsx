import React from 'react';
// import type { Interview } from './AddInterviewForm'; // Note: In a real project, this would be imported from a shared types file.
import type { InterviewListProps } from '../App';



const InterviewList: React.FC<InterviewListProps> = ({ interviews, onUpdateStatus, statuses }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">My Applications</h2>
      {interviews.length === 0 ? (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">No interviews added yet.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map((interview) => (
            <li key={interview._id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-inner flex flex-col sm:flex-row justify-between items-center transition-all duration-200 hover:shadow-lg">
              <div className="flex-grow text-center sm:text-left mb-2 sm:mb-0">
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{interview.title} at {interview.company}</h3>
                {interview.role && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">Role: {interview.role}</p>
                )}
                {interview.date && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">Date Applied: {interview.date}</p>
                )}
                {interview.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">Notes: {interview.notes}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => interview._id && onUpdateStatus(interview._id, status)}
                    className={`
                      text-xs font-bold py-1 px-3 rounded-full transition-colors duration-200
                      ${interview.status === status
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewList;

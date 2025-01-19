import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { Case } from '../types';

interface CaseCardProps {
  caseData: Case;
  onComplete: (id: number) => void; // Function to handle completion
}

export function CaseCard({ caseData, onComplete }: CaseCardProps) {
  const navigate = useNavigate();

  // Don't render the card if the case is completed
  if (caseData.status === 'completed') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ClipboardList className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{caseData.title}</h2>
          <p className="text-gray-600 mb-4">{caseData.shortDescription}</p>
          <button
            onClick={() => navigate(`/case/${caseData.id}`)} // Navigate to CaseDetailsPage
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Start Diagnosis
          </button>
         
        </div>
      </div>
    </div>
  );
}

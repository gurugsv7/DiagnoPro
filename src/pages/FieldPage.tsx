import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { medicalCases, medicalFields } from '../data'; // Import medicalCases
import { CaseCard } from '../components/CaseCard'; // Import CaseCard
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FieldPage() {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const field = medicalFields.find(f => f.id === fieldId);
  const [fieldCases, setFieldCases] = useState<any[]>([]);

  // Fetch and filter cases when the fieldId changes
  useEffect(() => {
    const fieldCases = medicalCases.filter(c => c.field === fieldId && c.status === 'pending');
    setFieldCases(fieldCases.slice(0, 5)); // Show only the first 5 pending cases
  }, [fieldId]);

  // Handle completion of a case
  const handleCaseCompletion = (completedCaseId: number) => {
    // Mark the completed case as 'completed' in the medicalCases array
    const updatedCases = medicalCases.map((caseData) => {
      if (caseData.id === completedCaseId) {
        return { ...caseData, status: 'completed' }; // Update the status to completed
      }
      return caseData;
    });

    // Update the list of visible cases for the field
    const nextPendingCase = updatedCases.find(
      (caseData) => caseData.status === 'pending' && caseData.field === fieldId
    );

    if (nextPendingCase) {
      setFieldCases((prevCases) => {
        const updatedFieldCases = [...prevCases.slice(1), nextPendingCase]; // Replace the first case and add the next one
        return updatedFieldCases;
      });
    }
  };

  if (!field) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Specialty not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64">
        <img
          src={field.imageUrl}
          alt={field.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{field.name}</h1>
          <p className="text-lg text-gray-200">{field.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {fieldCases.map((caseData) => (
            <CaseCard key={caseData.id} caseData={caseData} onComplete={handleCaseCompletion} />
          ))}
        </div>

        {fieldCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No cases available for this specialty yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

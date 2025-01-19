import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { medicalCases, updateCaseStatus } from '../data'; // Ensure updateCaseStatus is imported
import { ArrowLeft, Stethoscope, ClipboardList, User } from 'lucide-react';

export function CaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [visibleCases, setVisibleCases] = useState<any[]>([]); // State to hold the visible cases

  // Function to load 5 pending cases initially
  useEffect(() => {
    const initialCases = medicalCases.filter((caseData) => caseData.status === 'pending').slice(0, 5);
    setVisibleCases(initialCases);
  }, []);

  const caseData = medicalCases.find((c) => c.id === Number(id));

  if (!caseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Case not found</p>
      </div>
    );
  }

  const handleSubmit = () => {
    const isCorrect = diagnosis.toLowerCase() === caseData.correctDiagnosis.toLowerCase();

    // Set feedback message
    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Correct! ${caseData.explanation}`
        : `Incorrect. The correct diagnosis is ${caseData.correctDiagnosis}. ${caseData.explanation}`,
    });

    // Mark case as completed
    updateCaseStatus(caseData.id, 'completed'); // Update the case's status to 'completed'

    // Replace the completed case with the next available one
    const nextPendingCase = medicalCases.find((caseItem) => caseItem.status === 'pending');
    if (nextPendingCase) {
      setVisibleCases((prevCases) => {
        const updatedVisibleCases = [...prevCases.slice(1), nextPendingCase]; // Replace the first and add the next case
        return updatedVisibleCases;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)} // Only navigates back when the user clicks this button
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{caseData.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Patient Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">
                Age: <span className="font-medium text-gray-900">{caseData.age} years</span>
              </p>
              <p className="text-gray-600">
                Gender: <span className="font-medium text-gray-900">{caseData.gender}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600">Medical History:</p>
              <p className="font-medium text-gray-900">{caseData.medicalHistory}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Symptoms</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {caseData.symptoms.map((symptom, index) => (
              <li key={index} className="text-gray-800">
                {symptom}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Your Diagnosis</h2>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter your diagnosis..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Diagnosis
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-6 rounded-xl ${
              feedback.isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p className={`text-lg ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

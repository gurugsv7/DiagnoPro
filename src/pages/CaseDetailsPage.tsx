import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { medicalCases, updateCaseStatus } from '../data'; // Ensure updateCaseStatus is imported
import { ArrowLeft, Stethoscope, ClipboardList, User } from 'lucide-react';

export function CaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

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
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center"> {/* Reduced padding */}
          <button
            onClick={() => navigate(-1)} // Only navigates back when the user clicks this button
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">{caseData.title}</h1> {/* Reduced font size */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Patient Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Symptoms</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {caseData.symptoms.map((symptom, index) => (
              <li key={index} className="text-gray-800">{symptom}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Stethoscope className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Your Diagnosis</h2>
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
            className={`p-6 rounded-xl ${feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
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


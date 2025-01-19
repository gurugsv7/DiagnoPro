import React from 'react';
import { medicalFields } from '../data';
import { Brain, Heart, Baby, Scan, Bone, Wind, Activity, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const icons = {
  Brain,
  Heart,
  Baby,
  Scan,
  Bone,
  Wind,
  Activity
};

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-8 sm:py-16 text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
              DiagnoPro
            </h1>
            <p className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto px-4">
              Enhance your clinical expertise through interactive medical case studies
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm px-4">
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white">
                {medicalFields.length} Specialties
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white">
                Real Cases
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white">
                Interactive
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Specialties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
          Explore Medical Specialties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {medicalFields.map((field) => {
            const IconComponent = icons[field.icon as keyof typeof icons];

            return (
              <div
                key={field.id}
                className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer group"
                onClick={() => navigate(`/field/${field.id}`)}
              >
                <div className="relative h-36 sm:h-48">
                  <img
                    src={field.imageUrl}
                    alt={field.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center">
                    <div className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white ml-2 sm:ml-3">{field.name}</h2>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-gray-600">{field.description}</p>
                  <div className="mt-3 sm:mt-4 flex items-center text-blue-600">
                    <span className="text-xs sm:text-sm font-medium">Explore cases</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Me Section with Blue Background */}
      <div className="py-6 bg-blue-50"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">About Me</h2> {/* Reduced margin */}
          <p className="text-sm sm:text-base text-gray-600">
            I created DiagnoPro to help medical students and professionals enhance their clinical expertise through interactive case studies and real-world scenarios. This platform aims to provide a fun and engaging way to practice diagnoses and expand your knowledge in various medical fields.
          </p>
        </div>
      </div>

      {/* Vision Section with Blue Background */}
      <div className="py-6 bg-blue-50"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Vision</h2> {/* Reduced margin */}
          <p className="text-sm sm:text-base text-gray-600">
            My vision is to create a platform that empowers medical students and professionals to practice, learn, and grow by providing access to interactive, real-life case studies and scenarios. I believe that continuous learning and hands-on practice are key to improving clinical skills and making a positive impact in healthcare.
          </p>
        </div>
      </div>

      {/* Features Section with Blue Background */}
      <div className="py-6 bg-blue-50"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Features</h2> {/* Reduced margin */}
          <p className="text-sm sm:text-base text-gray-600">
            DiagnoPro provides various interactive features, including case study simulations, feedback, and progress tracking to help users enhance their medical knowledge. Whether you are a student or a professional, DiagnoPro offers a unique way to improve your diagnosis skills.
          </p>
        </div>
      </div>

      {/* Contact Section with Blue Background */}
      <div className="py-6 bg-blue-50"> {/* Reduced padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Contact</h2> {/* Reduced margin */}
          <p className="text-sm sm:text-base text-gray-600">
            If you have any questions, suggestions, or just want to connect, feel free to reach out! You can contact me at <a href="mailto:gurugsv777@gmail.com" className="text-blue-600">gurugsv777@gmail.com</a>.
          </p>
        </div>
      </div>

      {/* Buy Me a Coffee Section */}
      <div className="py-6 bg-gray-50 text-center">
        <a
          href="https://www.buymeacoffee.com/yourusername" // Replace with your Buy Me a Coffee link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        >
          <span className="mr-2">Buy Me a Coffee</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12h6M12 5v14"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

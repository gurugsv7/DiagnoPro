import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FieldPage } from './pages/FieldPage';
import { CaseDetailsPage } from './pages/CaseDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/field/:fieldId" element={<FieldPage />} />
        <Route path="/case/:id" element={<CaseDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
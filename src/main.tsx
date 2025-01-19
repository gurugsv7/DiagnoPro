import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Change 'root' to 'app' to match the id in index.html
createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

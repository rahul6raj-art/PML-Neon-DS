import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tokens/colors.css';
import './tokens/numbers.css';
import './tokens/typography.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

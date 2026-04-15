import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tokens/colors.css';
import './tokens/numbers.css';
import './tokens/typography.css';
import './index.css';
import { ViewportPlatformProvider } from './layout';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewportPlatformProvider>
      <App />
    </ViewportPlatformProvider>
  </StrictMode>,
)

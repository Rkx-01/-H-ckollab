import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // ✅ Import AppProvider

const clerkPubKey = "pk_test_ZXhjaXRpbmctYW5lbW9uZS02MC5jbGVyay5hY2NvdW50cy5kZXYk";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();

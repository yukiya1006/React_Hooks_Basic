import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const yamacodeInfo = {
  name: "yamacode",
  age: "26",
};

const YamaCodeContext = createContext(yamacodeInfo);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <YamaCodeContext.Provider value={yamacodeInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </YamaCodeContext.Provider>
);
reportWebVitals();

export default YamaCodeContext;

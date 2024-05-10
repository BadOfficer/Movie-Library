import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <App />
    <ToastContainer position='bottom-right' autoClose={2000}/>
  </React.StrictMode>
)

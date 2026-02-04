import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css' 

// --- ADD THESE TWO LINES IF MISSING ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// --------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* ADD THIS COMPONENT */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        theme="dark" // Matches your new dark theme
      />
    </Provider>
  </React.StrictMode>
)
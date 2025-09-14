import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CacheBuster from './components/CacheBuster.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CacheBuster>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheBuster>
  </StrictMode>,
)

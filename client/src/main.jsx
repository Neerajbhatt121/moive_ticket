import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
 // <StrictMode>
    <AuthProvider>
       <App />
    </AuthProvider>
 // </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { ThemeProvider } from './context/Theme.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
 // <StrictMode>
   <AuthProvider>
      <ThemeProvider>
         <App />
      </ThemeProvider> 
   </AuthProvider>
 // </StrictMode>,
)

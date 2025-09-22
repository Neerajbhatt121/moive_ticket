import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import { ThemeProvider } from './context/Theme.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
 // <StrictMode>
   <AuthProvider>
      <ThemeProvider>
         <SearchProvider>
            <App />
         </SearchProvider>
      </ThemeProvider> 
   </AuthProvider>
 // </StrictMode>,
)

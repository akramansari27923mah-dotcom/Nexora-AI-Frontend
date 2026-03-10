import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './features/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { initFirebaseAuthListener } from './features/auth/firebaseAuthListener.js'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { Toaster,toast, resolveValue } from 'react-hot-toast';

initFirebaseAuthListener(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
     
     <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{
   
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: 'var(--card-bg)', 
      color: 'var(--text-primary)',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
    },

  
    success: {
      duration: 3000,
      style: {
        background: 'var(--success-bg, #22c55e)', 
        color: 'var(--text-primary)',
      },
      iconTheme: {
        primary: 'var(--success-primary, #16a34a)',
        secondary: 'var(--success-secondary, #fff)',
      },
    },
    error: {
      duration: 5000,
      style: {
        background: 'var(--error-bg, #ef4444)',
        color: 'var(--text-primary)',
      },
      iconTheme: {
        primary: 'var(--error-primary, #b91c1c)',
        secondary: 'var(--error-secondary, #fff)',
      },
    },
    loading: {
      style: {
        background: 'var(--loading-bg, #fbbf24)',
        color: 'var(--text-primary)',
      },
    },
  }}
/>

    </Provider>
  </StrictMode>,
)

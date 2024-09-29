import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//pages
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import GuestLayout from './layout/GuestLayout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      { 
        path: '/', 
        element: <Login/> 
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

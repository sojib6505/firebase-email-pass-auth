import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root.jsx'
import Home from './Component/Header/Home/Home.jsx'
import SignUp from './Component/SignUp/SignUp.jsx'
import Login from './Component/Login/Login.jsx'

const router = createBrowserRouter([
  {path:'/',
    Component: Root,
    children:[
      {index:true,Component: Home},
      {path:'signUp',Component: SignUp},
      {path:'login',Component: Login}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </StrictMode>,
)

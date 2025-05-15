import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, } from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignUp from './pages/user/SignUp.jsx';
import SignIn from './pages/user/SignIn.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Users from './pages/user/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch('http://localhost:3000/coffees'),
        Component: Home,
      },
      {
        path: "add-coffee",
        Component: AddCoffee,
      },
      {
        path: 'update-coffee/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: UpdateCoffee,
      },
      {
        path: 'signup',
        Component: SignUp,
      },
      {
        path: 'signin',
        Component: SignIn,
      },
      {
        path: 'users',
        loader: ()=> fetch('http://localhost:3000/users'),
        Component: Users,
      },

      {
        path: 'dashboard',
        loader: () => fetch('http://localhost:3000/contact'),
        Component: Dashboard,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)

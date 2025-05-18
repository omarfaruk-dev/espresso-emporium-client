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
import PrivateRoute from './routes/PrivateRoute.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch('https://espresso-emporium-server-alpha.vercel.app/coffees'),
        Component: Home,
      },
      {
        path: "add-coffee",
        element:
          <PrivateRoute>
            <AddCoffee />
          </PrivateRoute>
      },
      {
        path: 'coffee-details/:id',
        loader: ({ params }) => fetch(`https://espresso-emporium-server-alpha.vercel.app/coffees/${params.id}`),
        element:
          <PrivateRoute>
            <CoffeeDetails />
          </PrivateRoute>
      },
      {
        path: 'update-coffee/:id',
        loader: ({ params }) => fetch(`https://espresso-emporium-server-alpha.vercel.app/coffees/${params.id}`),
        element:
          <PrivateRoute>
            <UpdateCoffee />
          </PrivateRoute>
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
        loader: () => fetch('https://espresso-emporium-server-alpha.vercel.app/users'),
        element:
          <PrivateRoute>
            <Users />
          </PrivateRoute>

      },

      {
        path: 'dashboard',
        loader: () => fetch('https://espresso-emporium-server-alpha.vercel.app/contact'),
        element:
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
      },
      {
        path: '*',
        Component: ErrorPage,
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

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Rootlayout from './layout/root-layout'
import HomePage from './pages/homepage'
import Login from './pages/loginpage'
import Register from './pages/register'
import RegisterPW from './pages/registerPW';
import RegisterProfile from './pages/registerProfile'
import DetailsLP from './pages/detailsLP';
import { SideBarProvider } from './components/contextapi';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Rootlayout/>,
    children : [
      {
        index : true,
        element : <HomePage/>
      },
      {
        path : 'login',
        element : <Login/>
      },
      {
        path : 'ID',
        element : <Register/>
      },
      {
        path : 'PW',
        element : <RegisterPW/>
      },
      {
        path : 'Profile',
        element : <RegisterProfile/>
      },
      {
        path : 'LPdetails/:LPid',
        element : <DetailsLP/>
      }
    ]
  }
]);

const client = new QueryClient()

function App() {
  return (
    <SideBarProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}>

        </RouterProvider>
      </QueryClientProvider>
    </SideBarProvider>
    
    
  )
}

export default App


import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Rootlayout from './layout/root-layout'
import HomePage from './pages/homepage'
import Login from './pages/loginpage'
import Register from './pages/register'
import RegisterPW from './pages/registerPW';
import RegisterProfile from './pages/registerProfile'

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
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App


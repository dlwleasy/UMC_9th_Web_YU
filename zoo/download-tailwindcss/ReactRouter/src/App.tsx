import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
//import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //element: <RootLayout />,
    errorElement: <NotFound />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

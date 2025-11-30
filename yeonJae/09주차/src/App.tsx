import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./component/homePage";
import { Rootlayout } from "./root-layout/layout";
import {CartProvider} from './component/contextapi'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Homepage/>,
      }
    ],
  },
]);



function App() {
  return (
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
  );
}

export default App;

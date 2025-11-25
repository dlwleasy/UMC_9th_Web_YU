import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/movies";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,

    //아래에 표시할 자식 라우트
    children: [
      {
        index: true, //부모의 경로가 /일 때 보여줄 기본 경로
        element: <HomePage />,
      },
      {
        path: "movies/:movieId", // /movies/123
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

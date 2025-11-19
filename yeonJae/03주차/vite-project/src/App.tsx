import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MoviesProvider } from './context/moviesContext';

import RootLayout from './layout/root-layout';
import PopularMoviesPage from './pages/Popularmovies'
import HomePage from './pages/HomePage';
import { MovieDetailPage } from './pages/moviedetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    children: [
      {
        index:true,
        element:<HomePage></HomePage>
      },
      {
        path: 'popularMovies',
        element : <PopularMoviesPage/>
      }
    ]
  },
  {
    path:'popularMovies/:movieId',
    element: <MovieDetailPage/>
  }
]);

function App() {
  return (
  <MoviesProvider>
    <RouterProvider router={router} />
  </MoviesProvider>)
  
}

export default App;
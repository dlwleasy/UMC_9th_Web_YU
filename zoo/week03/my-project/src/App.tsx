import "./App.css";
import MoviePage from "./pages/MoviePage";

function App() {
  console.log(import.meta.env.VITE_IMDB_KEY);
  return (
    <>
      <MoviePage />
    </>
  );
}

export default App;

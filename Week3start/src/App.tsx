import { Link } from './router/Link';
import { Router } from './router/Router';
import { Route } from './router/Route';

const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage   = () => <h1>애옹 페이지</h1>;
const JoyPage     = () => <h1>조이 페이지</h1>;
const NotFound    = () => <h1>404 Not Found</h1>;

export default function App() {
  return (
    <div className="p-6">
      <nav className="flex gap-4">
        <Link to="/matthew">MATTHEW</Link>
        <Link to="/aeong">AEONG</Link>
        <Link to="/joy">JOY</Link>
        <Link to="/not-found">NOT FOUND</Link>
      </nav>

      <Router>
        <Route path="/matthew" component={MatthewPage} />
        <Route path="/aeong" component={AeongPage} />
        <Route path="/joy" component={JoyPage} />
        <Route path="/not-found" component={NotFound} />
      </Router>
    </div>
  );
}
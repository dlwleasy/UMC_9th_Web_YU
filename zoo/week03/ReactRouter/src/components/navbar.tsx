// src/components/navbar.tsx
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// { id?: string }

const Navbar = () => {
  const params = useParams();
  return (
    <nav>
      <div>
        <Link to="/">홈 페이지로 이동</Link>
      </div>
      <Link to={`/movies/${params.id}`}>영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;

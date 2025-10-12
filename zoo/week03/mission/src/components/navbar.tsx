// src/components/navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div>
        <nav>
          <Link to="/ ">홈 </Link>
          <Link to="/popular">인기영화</Link>
          <Link to="/onScreen">상영중</Link>
          <Link to="/highRated">평점 높은</Link>
          <Link to="/upcoming">개봉 예정</Link>
        </nav>
      </div>

      <div>
        <button> 페이지 </button>
      </div>
    </>
  );
};

export default Navbar;

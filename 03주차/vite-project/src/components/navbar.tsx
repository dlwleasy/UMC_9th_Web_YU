// src/components/navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='Nav_Link'>
        <Link to='/'>홈</Link>
        <Link to='/popularMovies'>인기 영화</Link>
        <Link to='/onTheather'>상영 중</Link>
        <Link to='/MostRate'>평점 높은</Link>
        <Link to='/releaseSoon'>개봉 예정</Link>
    </nav>
  );
};

export default Navbar;
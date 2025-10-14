import {Link} from 'react-router-dom';

const navbars = () => {
    return (
        <>
            <nav className="NavBar_container">
                <h1>로그인 창</h1>
                <span className="NavBar-Buttons_container">
                    <button><Link to='/login'>로그인</Link></button>
                    <button><Link to='/ID'>회원가입</Link></button>
                </span>
            </nav>
        </>
    )
}

export default navbars
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import { apiInstance } from './axios';

const navbars = () => {
    const MoveToLogin = useNavigate()
    const sendToken = async() => {
        const Token = localStorage.getItem('accessToken')
        const GetMyInfo = '/v1/users/me'
        const headers = {
                Authorization: `Bearer ${Token}`,
            };
        apiInstance.get(GetMyInfo, {headers}).then(
            function (response) {
                console.log(response)
            }
        ).catch (function(error){
            console.log(error)
            const Token = localStorage.getItem('accessToken')
            const GetMyInfo = 'http://localhost:8000/v1/users/me'
            const headers = {
                Authorization: `Bearer ${Token}`,
            };
            axios.get(GetMyInfo, {headers}).then(
                (response) => {
                    console.log(response)
                }
            )
            MoveToLogin('/login')
        })
    }
    return (
        <>
            <nav className="NavBar_container">
                <h1>로그인 창</h1>
                <span className="NavBar-Buttons_container">
                    <button><Link to='/login'>로그인</Link></button>
                    <button><Link to='/ID'>회원가입</Link></button>
                    <button onClick={sendToken}>내 정보</button>
                </span>
            </nav>
        </>
    )
}

export default navbars
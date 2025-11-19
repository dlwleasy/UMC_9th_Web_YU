import { useNavigate} from 'react-router-dom';
import axios from 'axios'
import { apiInstance } from './axios';
import { useSidebar } from './contextapi';

const navbars = () => {
    
    const {isOpen,setOpen} = useSidebar()

    const SideBarOpen = () => {
        setOpen(!isOpen)
    }
    
    let status=localStorage.getItem('IsLoginned') ?? false
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
    const login =useNavigate()
    const register =useNavigate()

    const LogOut = () => {
        const LogOut = '/v1/auth/signout'
        apiInstance.post(LogOut).then(
            (res) => {
                console.log(`[로그아웃 요청에 성공하셨습니다]\n${res.data.message}\n[로그아웃 요청에 성공하셨습니다]`)
            }
        ).catch(
            (error) => {
                console.log(`[최종 시도 로그아웃 중 오류 발생!]\n ${error} \n[최종 시도 로그아웃 중 오류 발생!]`)
                alert('로그아웃에 실패했음')
            }
        )
    }
    
    
    
    return (
        <>
            <nav className="NavBar_container">
                <span className='NavBar-Title_container'>
                    
                        <button className='NavBar-button' onClick={SideBarOpen}>
                            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"></svg>        
                        </button>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
                    <h1>LP</h1>
                </span>
                
                <span className="NavBar-Buttons_container">
                    {status
                    ? 
                    <>
                    <button onClick={sendToken}>내 정보</button>
                    <button onClick={LogOut}>로그아웃</button>
                    </>:
                    <>
                    <button onClick={()=>login('/login')}>로그인</button>
                    <button onClick={()=>register('/ID')}>회원가입</button>
                    </>}
                </span>
            </nav>
        </>
    )
}

export default navbars
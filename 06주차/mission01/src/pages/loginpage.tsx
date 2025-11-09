import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
    const [ID, setID] = useState('')
    
    const navigateForsuccessLogin = useNavigate();


    const navigate = useNavigate();
    const handleIDCheck = (e:any) => {
        const Value_ID = e.target.value;
        setID(Value_ID);
    }

    const [Password, setPassword] = useState('')

    const handlePasswordCheck = (e:any) => {
        const Value_password = e.target.value;
        setPassword(Value_password)
    }

    const ID_OK : boolean= (ID.includes('@') && ID.includes('.'))
    const PW_OK : boolean = (Password.length >= 6)
    const isbothOK = ID_OK && PW_OK

    const getToken = async () => {
        const SingInURL = 'http://localhost:8000/v1/auth/signin';
        axios.post(SingInURL,{'email':ID,'password':Password}).then(
            function (response) {
                const {accessToken, refreshToken} = response.data.data;
                console.log(response,accessToken,refreshToken);
                navigateForsuccessLogin('/');
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        ).catch(function (response){
            console.log('로그인 시도중 에러 발생:', response)
        })
    }

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={()=>navigate(-1)}>&lt;</button>
                    <span>로그인</span>
                </div>
                <button className="google_login">구글 로그인</button>
                <input type="email" placeholder="아이디를 입력해 주세요." onChange={handleIDCheck}></input>
                {ID_OK == false && (
                    <span className="alert ID">이메일 형식이 아닙니다.</span>
                )}
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={handlePasswordCheck}></input>
                {PW_OK == false && (
                    <span className="alert PassWord">비밀번호는 6자리 이상인지 확인하십시오.</span>
                )}
                <button className="login" disabled={!isbothOK} onClick={getToken}>로그인</button>
            </section>
        </main>
    )
}


export default Login
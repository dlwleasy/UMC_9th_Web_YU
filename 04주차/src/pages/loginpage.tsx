import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [ID, setID] = useState(false)


    const navigate = useNavigate();
    const handleIDCheck = (e:any) => {
        const Value_ID = e.target.value;
        setID((Value_ID.includes('@') && Value_ID.includes('.')));
    }

    const [Password, setPassword] = useState(false)

    const handlePasswordCheck = (e:any) => {
        const Value_password = e.target.value;
        setPassword(Value_password.length >= 6)
    }

    const isbothOK = ID && Password

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={()=>navigate(-1)}>&lt;</button>
                    <span>로그인</span>
                </div>
                <button className="google_login">구글 로그인</button>
                <input type="email" placeholder="아이디를 입력해 주세요." onChange={handleIDCheck}></input>
                {ID == false && (
                    <span className="alert ID">이메일 형식이 아닙니다.</span>
                )}
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={handlePasswordCheck}></input>
                {Password == false && (
                    <span className="alert PassWord">비밀번호는 6자리 이상인지 확인하십시오.</span>
                )}
                <button className="login" disabled={isbothOK}>로그인</button>
            </section>
        </main>
    )
}


export default Login
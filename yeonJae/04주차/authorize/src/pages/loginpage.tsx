import { useNavigate } from "react-router-dom";
import { ValidateID, ValidatePW, getToken } from "./Hooks";


const Login = () => {

    const {ID,handleIDCheck } = ValidateID()
    const {Password, handlePasswordCheck} = ValidatePW()

    const navigate = useNavigate();
    
    const ID_OK : boolean= (ID.includes('@') && ID.includes('.'))
    const PW_OK : boolean = (Password.length >= 6)
    const isbothOK = ID_OK && PW_OK
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
                <button className="login" disabled={!isbothOK} onClick={()=> getToken(ID,Password)}>로그인</button>
            </section>
        </main>
    )
}
export default Login
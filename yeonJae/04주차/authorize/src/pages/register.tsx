import { useState } from "react"
import { useNavigate } from "react-router-dom"




const Register = () => {
    const [Value_ID, setID] = useState('')
    
    

    const handleIDCheck = (e:any) => {
        const Value_ID = e.target.value;
        setID(Value_ID);
    }

    const IDoggle = (Value_ID.includes('@') && Value_ID.includes('.'))

    const navigateSendID = useNavigate()
    const navigateToback = useNavigate()
    const navigate = useNavigate();

    const navigateToPW = () => {
        navigate('/PW');
        navigateSendID('/PW', {state : {Email:Value_ID}});
    };

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={() => navigateToback(-1)}>&lt;</button>
                    <span>회원가입</span>
                </div>
                <button className="google_login">구글 로그인</button>
                <input type="email" placeholder="이메일를 입력해 주세요." onChange={handleIDCheck}></input>
                {IDoggle ==  false&& (
                    <span className="alert ID">이메일 형식이 아닙니다.</span>
                )}
                <button className="login" disabled={!IDoggle} onClick={navigateToPW}>다음</button>
            </section>
        </main>
    )
}


export default Register


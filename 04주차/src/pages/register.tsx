import { useState } from "react"
import { Link } from "react-router-dom";





const Register = () => {
    const [ID, setID] = useState(false)

    const handleIDCheck = (e:any) => {
        const Value_ID = e.target.value;
        setID((Value_ID.includes('@') && Value_ID.includes('.')));
    }

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" >&lt;</button>
                    <span>회원가입</span>
                </div>
                <button className="google_login">구글 로그인</button>
                <input type="email" placeholder="이메일를 입력해 주세요." onChange={handleIDCheck}></input>
                {ID == false && (
                    <span className="alert ID">이메일 형식이 아닙니다.</span>
                )}
                <button className="login" disabled={ID}><Link to='/PW'>다음</Link></button>
            </section>
        </main>
    )
}


export default Register


import { useState } from "react"





const RegisterPW = () => {


    const [Password, setPassword] = useState(false)

    const handlePasswordCheck = (e:any) => {
        const Value_password = e.target.value;
        setPassword(Value_password.length >= 6)
    }

    const [same, IsSame] = useState(false)
    const handleSamePW = (e:any) => {
        const Value_password = e.target.value;
        IsSame(Value_password==Password)
    }

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back">&lt;</button>
                    <span>로그인</span>
                </div>
                <button className="google_login">구글 로그인</button>
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={handlePasswordCheck}></input>
                {Password == false && (
                    <span className="alert PassWord">비밀번호가 6자리 이상인지 확인하십시오.</span>
                )}
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={handleSamePW}></input>
                {same == false && (
                    <span className="alert IsSame">비밀번호가 다릅니다.</span>
                )}
                <button className="login" disabled={same}>다음</button>
            </section>
        </main>
    )
}


export default RegisterPW
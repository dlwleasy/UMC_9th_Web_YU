import { useNavigate } from 'react-router-dom';
import memberIcon from '../assets/member_icon2.png';

const RegisterProfile = () => {
    const navigate = useNavigate();
    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={()=>navigate(-1)}>&lt;</button>
                    <span>회원가입</span>
                </div>
                <img src={memberIcon} width={300}></img>
                <input placeholder="닉네임을 입력하시오"></input>
                <button className="login">회원가입 완료</button>
            </section>
        </main>
    )
}

export default RegisterProfile
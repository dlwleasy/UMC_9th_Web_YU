import { useLocation, useNavigate } from 'react-router-dom';
import memberIcon from '../assets/member_icon2.png';
import { useState } from 'react';
import {getRegisterInfo} from './Hooks'


const RegisterProfile = () => {
    const navigate = useNavigate();
    
    const [name, setName]= useState('')

    const handleNameCheck = (e:any) => {
        const Name = e.target.value;
        setName(Name);
    }

    const location = useLocation()
    const email = location.state.email
    const password = location.state.password


    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={()=>navigate(-1)}>&lt;</button>
                    <span>회원가입</span>
                </div>
                <img src={memberIcon} width={300}></img>
                <input placeholder="닉네임을 입력하시오" onChange={handleNameCheck}></input>
                <button className="login" onClick={()=>getRegisterInfo(name,email,password)}>회원가입 완료</button>
            </section>
        </main>
    )
}

export default RegisterProfile
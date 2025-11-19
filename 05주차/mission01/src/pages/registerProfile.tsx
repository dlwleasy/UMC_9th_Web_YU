import { useLocation, useNavigate } from 'react-router-dom';
import memberIcon from '../assets/member_icon2.png';
import { useState } from 'react';
import axios from "axios";


const RegisterProfile = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const [name, setName]= useState()

    const handleNameCheck = (e:any) => {
        const Name = e.target.value;
        setName(Name);
    }
    
    const email = location.state.email
    const password = location.state.password
    console.log('name :', name,'email :', email, 'password :', password)

    const SendRegisterInfo = async () => {
        
        const singupURL = 'http://localhost:8000/v1/auth/signup';
        axios.post(singupURL,{'name': name, 'email': email, 'password': password}).then(
        function (response) {
            console.log(response)
            }).catch(function (response) {
                console.log('회원가입 시도 중 error 발생:', response)}
            )
        }

    return (
        <main>
            <section className="login_container">
                <div>
                    <button className="Button-back" onClick={()=>navigate(-1)}>&lt;</button>
                    <span>회원가입</span>
                </div>
                <img src={memberIcon} width={300}></img>
                <input placeholder="닉네임을 입력하시오" onChange={handleNameCheck}></input>
                <button className="login" onClick={SendRegisterInfo}>회원가입 완료</button>
            </section>
        </main>
    )
}

export default RegisterProfile
import { useContext, useState } from "react"
import {GetLPdetails} from "../hooks/ToggleHook"
import { LoginContext } from "../components/contextapi"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export function getdata(LPid:number|any) {

    const {data} =GetLPdetails(LPid)
    const data_LP = data
    const Like = data?.data.data.like ?? 0

    const CreatedAT = data?.data.data.createdAt
    const dateObj = new Date(CreatedAT)
    const prettireFromet_date = dateObj.toLocaleDateString('ko-KR',{
        year : 'numeric',
        month : 'long',
        day: 'numeric'
    })
    return {data_LP, Like, prettireFromet_date}
}



export function ValidateID() {
    const [ID, setID] = useState('')

    const handleIDCheck = (e:any) => {
        const Value_ID = e.target.value;
        setID(Value_ID);
    }
    return {ID, handleIDCheck}
}



export function ValidatePW() {
    const [Password, setPassword] = useState('')

    const handlePasswordCheck = (e:any) => {
        const Value_password = e.target.value;
        setPassword(Value_password)
    }
    return {Password,handlePasswordCheck}
}


export const useToken = () => {
    const navigate = useNavigate()
    const Authcontext = useContext(LoginContext)
    const getToken = async (ID:string,PassWord:string) => {
    
    const SingInURL = 'http://localhost:8000/v1/auth/signin';
    axios.post(SingInURL,{'email':ID,'password':PassWord}).then(
            function (response) {
                const {accessToken, refreshToken} = response.data.data;
                console.log(response,accessToken,refreshToken)
                localStorage.clear()
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                Authcontext?.loginProc(accessToken,response.data.data.name)
                navigate('/')
            }
        ).catch(function (response){
            console.log('로그인 시도중 에러 발생:', response)
        })
    }
    return {getToken}
}

export function getRegisterInfo(name:string,email:string,password:string) {
    const SendRegisterInfo = async () => {
        
        const singupURL = 'http://localhost:8000/v1/auth/signup';
        axios.post(singupURL,{'name': name, 'email': email, 'password': password}).then(
        function (response) {
            console.log(response)
            }).catch(function (response) {
                console.log('회원가입 시도 중 error 발생:', response)}
            )
        }
}
import { useContext, useState } from "react";
import { GetLPdetails } from "../hooks/ToggleHook";
import { LoginContext } from "../components/contextapi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../components/axios";


export function getdata(LPid: number | any) {
  const { data } = GetLPdetails(LPid);
  const data_LP = data;
  const Like = data?.data.data.like ?? 0;

  const CreatedAT = data?.data.data.createdAt;
  const dateObj = new Date(CreatedAT);
  const prettireFromet_date = dateObj.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return { data_LP, Like, prettireFromet_date };
}

export function ValidateID() {
  const [ID, setID] = useState("");

  const handleIDCheck = (e: any) => {
    const Value_ID = e.target.value;
    setID(Value_ID);
  };
  return { ID, handleIDCheck };
}

export function ValidatePW() {
  const [Password, setPassword] = useState("");

  const handlePasswordCheck = (e: any) => {
    const Value_password = e.target.value;
    setPassword(Value_password);
  };
  return { Password, handlePasswordCheck };
}

export const useToken = () => {
  const navigate = useNavigate();
  const Authcontext = useContext(LoginContext);
  const getToken = async (ID: string, PassWord: string) => {
    const SingInURL = "http://localhost:8000/v1/auth/signin";
    axios
      .post(SingInURL, { email: ID, password: PassWord })
      .then(function (response) {
        const { accessToken, refreshToken } = response.data.data;
        console.log(response, accessToken, refreshToken);
        localStorage.clear();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem('Email',ID)
        Authcontext?.loginProc(accessToken, response.data.data.name);
        navigate("/");
      })
      .catch(function (response) {
        console.log("로그인 시도중 에러 발생:", response);
      });
  };
  return { getToken };
};

export function getRegisterInfo(name: string, email: string, password: string) {
  const SendRegisterInfo = async () => {
    const singupURL = "http://localhost:8000/v1/auth/signup";
    axios
      .post(singupURL, { name: name, email: email, password: password })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log("회원가입 시도 중 error 발생:", response);
      });
  };
}

export const CreateLP = (
  title: string,
  content: string,
  tags: string[],
  image: string
) => {
  const url = "http://localhost:8000/v1/lps";
  const data = {
    "title": title,
    "content": content,
    "thumbnail": image,
    "tags": tags,
    "published": true,
  };
  const res = apiInstance.post(url,data);
  return res
};

export function ValidateTitle() {
  const [Title, setTitle] = useState("");

  const handletitleCheck = (e: any) => {
    const title = e.target.value;
    setTitle(title);
  };
  return { Title, handletitleCheck };
}

export function ValidateContent() {
  const [Content, setTitle] = useState("");

  const handlecontentCheck = (e: any) => {
    const content = e.target.value;
    setTitle(content);
  };
  return { Content, handlecontentCheck };
}

export const createComment = (LPid:number,content:string) => {
    const url = `http://localhost:8000/v1/lps/${LPid}/comments`;
    const data = {
  "content": content
}
    const res = apiInstance.post(url,data)
    return res
}

export const sendToken = async() => {
        const Token = localStorage.getItem('accessToken')
        const GetMyInfo = '/v1/users/me'
        const headers = {
                Authorization: `Bearer ${Token}`,
            };
        apiInstance.get(GetMyInfo, {headers}).then(
            function (response) {
                return response
            }
        ).catch (function(error){
            console.log(error)
            const Token = localStorage.getItem('accessToken')
            const GetMyInfo = 'http://localhost:8000/v1/users/me'
            const headers = {
                Authorization: `Bearer ${Token}`,
            };
            axios.get(GetMyInfo, {headers}).then(
                (response) => {
                    console.log(response)
                }
            )
            const navigate = useNavigate();
            const Authcontext = useContext(LoginContext);
            Authcontext?.logoutProc()
            navigate('/login')
        })
    }
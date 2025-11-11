import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 값 저장
  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePw = (e) => {
    setPw(e.target.value.trim());
  };

  // 값 검증
  const email_valid = email.includes("@") && email.includes(".");
  const pw_valid = pw.length > 6;
  const login_valid = email_valid && pw_valid;

  // 로그인 토큰
  const loginToken = () => {
    const loginURL = "http://localhost:8000/v1/auth/signin";
    axios
      .post(loginURL, { email: email, password: pw })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
        alert("없는 정보이거나 로그인에 실패하였습니다.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-header">
        <button className="login-header-back" onClick={() => navigate(-1)}>
          ◀
        </button>
        <h2 className="login-header-title">로그인</h2>
      </div>

      <button className="google">구글 로그인</button>
      <h4>-------------or------------------</h4>

      <div className="login">
        <input
          className="login-email"
          value={email}
          onChange={handleEmail}
          type="text"
          placeholder="이메일을 입력하세요!"
        />
        {/* 입력값이 있고 유효하지 않을 때만 에러 표시 */}
        {
          email.length > 0 && !email_valid && (
            <span className="alert ID">이메일 형식이 아닙니다.</span>
          ) //한줄로 끝낼 수 있으며 올바른 js표현식이라서 가능하다.
        }

        <input
          className="login-password"
          value={pw}
          onChange={handlePw}
          type="password"
          placeholder="비밀번호를 입력하세요!"
        />
        {/* 입력값이 있고 유효하지 않을 때만 에러 표시 */}
        {pw.length > 0 && !pw_valid && (
          <span className="alert ID">비밀번호는 6자 이상이어야 합니다.</span>
        )}

        <button
          className="login-button"
          disabled={!login_valid}
          onClick={loginToken}
        >
          로그인
        </button>
      </div>
    </>
  );
}

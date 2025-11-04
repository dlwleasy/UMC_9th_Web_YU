import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  //값 저장 -> 바뀌면 업그레이드 반복
  //이벤트로써 onChange가 되면 값을 저장하고 이를 추적해주기 시작하면 된다.

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //1.처음에는 값을 저장만 해줌
  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePw = (e) => {
    setPw(e.target.value.trim());
  };

  //2.값 검증
  const email_valid = email.includes("@") && email.includes(".");
  const pw_valid = pw.length() > 6;
  const login_valid = email_valid && pw_valid;

  //   else alert("올바르게 이메일을 입력하세요.");console.log("비밀번호는 최소 6자 이상이어야 합니다");

  //로그인 상태 활성화

  //토큰
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
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <Navbar></Navbar>
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
        ></input>
        {email_valid == false && (
          <span className="alert ID">이메일 형식이 아닙니다.</span>
        )}
        <input
          className="login-password"
          value={pw}
          onChange={handlePw}
          type="text"
          placeholder="비밀번호를 입력하세요!"
        ></input>
        {pw_valid == false && (
          <span className="alert ID">이메일 형식이 아닙니다.</span>
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

//입력값을 받아야된다. value-> useState로 한다면 추적가능하다. 변경되면 저장
//조건은 있다. 만족하지 않으면 에러 메시지를 보여준다.

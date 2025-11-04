import Navbar from "../components/Navbar.jsx";
import { useState } from "react";

export default function Login() {
  const [emailInput, setemailInput] = useState("");
  //값이 바뀐다면 추적을 해야된다- 알아서 추적을 해준다.
  //이벤트로써 확인할 수 있다.
  const handleEmail = (e) => {
    // return setemailInput(e.target.value);
    //근데 여기서 값이 잘못 들어오면 바로 오류를 출력하고 완전히 되기 전에는 버튼을 활성화 시키지 않는다?

    const input = e.target.value.trim();
    if (input.includes("@") && input.includes(".")) setemailInput(input);
    else alert("올바르게 이메일을 입력하세요.");
  };

  const [pwInput, setpwInput] = useState("");
  const handlePw = (e) => {
    const input = e.target.value.trim();

    if (input.length() > 6) setpwInput(input);
    else console.log("비밀번호는 최소 6자 이상이어야 합니다");
  };

  //로그인 상태 활성화 : 1의 조건을 만족한 경우 :

  const [active, setActive] = useState(false);
  if (
    emailInput.includes("@") &&
    emailInput.includes(".") &&
    pwInput.length > 6
  )
    setActive(true);
  else setActive(false);

  return (
    <>
      <Navbar></Navbar>
      <div className="login-header">
        <button className="login-header-back">◀</button>
        <h2 className="login-header-title">로그인</h2>
      </div>

      <button className="google">구글 로그인</button>
      <h4>-------------or------------------</h4>
      <div className="login">
        <input
          className="login-email"
          value={emailInput}
          onChange={handleEmail}
          type="text"
          placeholder="이메일을 입력하세요!"
        ></input>
        <input
          className="login-password"
          value={pwInput}
          onChange={handlePw}
          type="text"
          placeholder="비밀번호를 입력하세요!"
        ></input>
        <button className="login-button" onChange={active}>
          로그인
        </button>
      </div>
    </>
  );
}

//입력값을 받아야된다. value-> useState로 한다면 추적가능하다. 변경되면 저장
//조건은 있다. 만족하지 않으면 에러 메시지를 보여준다.

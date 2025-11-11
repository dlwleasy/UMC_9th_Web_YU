import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignupNickname() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, pw } = location.state || {};
  // 2. 닉네임 state 생성
  const [nickname, setNickname] = useState("");
  const nickname_valid = nickname.length > 0;
  const handleNickname = (e) => {
    setNickname(e.target.value.trim());
  };

  const signupToken = () => {
    // 4-1. 서버로 보낼 3가지 데이터를 모두 확인
    console.log("서버로 보낼 데이터:", { email, pw, nickname });

    // 4-2. TODO: 여기에 fetch 또는 axios를 사용해 서버에 API 요청

    const signupURL = "http://localhost:8000/v1/auth/signup";
    axios
      .post(signupURL, { email: email, password: pw, name: nickname })
      .then((response) => {
        console.log(response.data);
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          ◀
        </button>
        <h4>회원가입</h4>
        <img
          src="\src\assets\Persona verde.jpg"
          style={{
            width: 220,
            height: 220,
            objectFit: "cover",
            borderRadius: 12,
          }}
          alt="Profile Preview"
        />
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleNickname}
        />

        <button onClick={signupToken} disabled={!nickname_valid}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

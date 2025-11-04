import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function SignupNickname() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 단계에서 받은 이메일, 비밀번호
  const email = location.state?.email || "";
  const password = location.state?.password || "";

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (nickname.trim().length < 2) {
      setError("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    // 실제 서버 API 호출 부분 (axios 사용 가능)
    const getToken = async () => {
        const SingInURL = 'http://localhost:8000/v1/auth/signin';
        axios.post(SingInURL,{'email':ID,'password':Password}).then(
            function (response) {
                const {accessToken, refreshToken} = response.data.data;
                console.log(response,accessToken,refreshToken);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>◀</button>
      <h1>닉네임 설정</h1>

      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          backgroundColor: "#333",
          color: "white",
          padding: "8px",
        }}
      >
        회원가입 완료
      </button>
    </div>
  );
}

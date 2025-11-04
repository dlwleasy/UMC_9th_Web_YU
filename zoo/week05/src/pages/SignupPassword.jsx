import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // 이전 페이지에서 받은 이메일

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 닉네임 입력 페이지로 이동하면서 이메일 + 비밀번호 전달
    navigate("/signup/nickname", {
      state: { email, password },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>◀</button>
      <h1>비밀번호 설정</h1>

      <p>입력하신 이메일: {email}</p>

      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleNext}
        style={{
          marginTop: "10px",
          backgroundColor: "#333",
          color: "white",
          padding: "8px",
        }}
      >
        다음
      </button>
    </div>
  );
}

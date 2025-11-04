import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  useEffect(() => {
    if (!email) {
      setEmailError("");
      setIsButtonDisabled(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      setIsButtonDisabled(true);
    } else {
      setEmailError("");
      setIsButtonDisabled(false);
    }
  }, [email]);

  const handleNext = () => {
    if (isButtonDisabled) return;
    // ✅ 이메일을 다음 페이지로 넘기면서 이동
    navigate("/signup/password", { state: { email } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>◀</button>
      <h1>회원가입</h1>

      <input
        type="text"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}

      <button
        onClick={handleNext}
        disabled={isButtonDisabled}
        style={{
          backgroundColor: isButtonDisabled ? "#ccc" : "#333",
          color: "white",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
          marginTop: "10px",
        }}
      >
        다음
      </button>
    </div>
  );
}

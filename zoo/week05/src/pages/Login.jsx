import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // ⬅ 추가: 서버 에러 메시지

  const navigate = useNavigate();

  const handleIDCheck = (e) => {
    const Value_ID = e.target.value;
    setID(Value_ID);

    // 사용자가 새로 입력 중이면 에러 메시지 지워주기 (UX 좋음)
    setLoginError("");
  };

  const handlePasswordCheck = (e) => {
    const Value_password = e.target.value;
    setPassword(Value_password);

    setLoginError("");
  };

  // 이메일, 비밀번호 유효성 검사
  const ID_OK = ID.includes("@") && ID.includes(".");
  const PW_OK = Password.length >= 6;
  const isbothOK = ID_OK && PW_OK;

  // 로그인 요청
  const getToken = async () => {
    const SignInURL = "http://localhost:8000/v1/auth/signin";

    try {
      const response = await axios.post(SignInURL, {
        email: ID,
        password: Password,
      });

      // 서버에서 토큰 추출
      const { accessToken, refreshToken } = response.data.data;

      console.log("로그인 성공!", response);
      console.log("AccessToken:", accessToken);
      console.log("RefreshToken:", refreshToken);

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 로그인 성공 시 홈으로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 시도 중 에러 발생:", error);

      // 401이면 보통 "비번 틀림 / 유저 없음" 같은 인증 실패
      if (error.response?.status === 401) {
        const serverMsg = error.response?.data?.message;
        setLoginError(serverMsg || "이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        // 그 외 예: 서버 죽음, CORS 문제 등
        setLoginError(
          "로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  return (
    <main>
      <section className="login_container">
        <div>
          <button className="Button-back" onClick={() => navigate(-1)}>
            &lt;
          </button>
          <span>로그인</span>
        </div>

        <button className="google_login">구글 로그인</button>

        <input
          type="email"
          placeholder="아이디를 입력해 주세요."
          onChange={handleIDCheck}
        />
        {!ID_OK && ID && (
          <span className="alert ID">이메일 형식이 아닙니다.</span>
        )}

        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          onChange={handlePasswordCheck}
        />
        {!PW_OK && Password && (
          <span className="alert PassWord">
            비밀번호는 6자리 이상인지 확인하십시오.
          </span>
        )}

        {/* ⬇ 추가: 로그인 시 서버에서 온 에러 메시지 표시 */}
        {loginError && (
          <span
            className="alert loginError"
            style={{ color: "red", fontWeight: "bold", marginTop: "8px" }}
          >
            {loginError}
          </span>
        )}

        <button className="login" disabled={!isbothOK} onClick={getToken}>
          로그인
        </button>
      </section>
    </main>
  );
};

export default Login;

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  // 같은 이름표 써야됨 - 붙여진거 보고 판단함  const { received_email } = location.state || { "": "" };
  const { Sendemail: received_email } = location.state || {};

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState(""); //순서 중요 pw2_valid가 먼저 선언되면 안됨

  const pw_valid = pw.length >= 6;
  const pw2_valid = pw_valid && pw === pw2; //간략하게 만족하는조건만

  const handlePw = (e) => {
    setPw(e.target.value.trim());
  };
  const handlePw2 = (e) => {
    setPw2(e.target.value.trim());
  };
  return (
    <div>
      <div className="signup-header">
        {" "}
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          ◀
        </button>
        <h4>회원가입</h4>
        <p>입력하신 이메일: {received_email}</p>
        {/*무조건 state:{}를 넣어야 된다. 키값을 적어주면 그 값이 나오는 걸 이용  */}
      </div>

      <div>
        <input
          value={pw}
          onChange={handlePw}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {!pw_valid && pw.length > 0 && (
          <span className="alert PW">비밀번호는 6자 이상이어야 합니다.</span>
        )}
        <input
          value={pw2}
          onChange={handlePw2}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {pw_valid && pw2.length > 0 && pw !== pw2 && (
          <span className="alert PW">비밀번호가 일치하지 않습니다.</span>
        )}
        <button
          disabled={!pw2_valid}
          onClick={() => {
            navigate("/signup/nickname", {
              state: { email: received_email, pw: pw },
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

//오류 메시지를 띄우는거랑 상관없이 진행할떄는 또 로직이 다르다 버튼의 disabled를 보면된다.

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  // 이메일 유효성 검사

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
    // if (!email_valid) {
    //   alert("올바른 이메일 형식이 아닙니다!"); -> 이렇게 되면 바뀔때마다 문제생김
    // }
  };

  const email_valid = email.includes("@") && email.includes(".");

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
      </div>
      <div className="signup-methods">
        <button
          className="signup-methods-goggle"
          onClick={() => {
            alert("구글 회원가입은 준비중입니다!");
          }}
        >
          구글 회원가입
        </button>
        <h4>-------------or------------------</h4>
        <div className="signup-methods-email">
          <input
            value={email}
            onChange={handleEmail}
            type="text"
            placeholder="이메일을 입력하세요!"
          />
          {email.length > 0 && !email_valid && (
            <span className="alert ID">이메일 형식이 아닙니다.</span>
          )}
          {/*길이가 0이상이여야지만 된다 안 그러면 입력하기 전에 */}
          <button
            disabled={!email_valid}
            onClick={() =>
              navigate("/signup/password", { state: { Sendemail: email } })
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
//다음이 활성화되지 않는 이유를 알고싶은경우인데 그럼 작성하다가 띄워줘야겠다.
//state : 상태를 넘겨줄때의 규칙
//maps함수로 데이터를 넘길때 react-router-dom의 규칙상 반드시 객체로 한번 감싸서 보내야된다.
//(경로,상자(상자에 담는 물건))

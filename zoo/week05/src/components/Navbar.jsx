import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { apiInstance } from "../api/axios.js";
import axios from "axios";

export default function Navbar() {
  const MoveToLogin = useNavigate();
  let status = localStorage.getItem("IsLoginned") ?? false;
  console.log("로그인 여부", status);

  const sendToken = async () => {
    const Token = localStorage.getItem("accessToken");
    const GetMyInfo = "/v1/users/me";
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    apiInstance
      .get(GetMyInfo, { headers })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);

        axios.get(GetMyInfo, { headers }).then((response) => {
          console.log(response);
        });
        MoveToLogin("/login");
      });
  };

  // const LogOut = () => {
  //   const LogOut = "v1/auth/signout";
  //   apiInstance
  //     .post(LogOut)
  //     .then((res) => {
  //       console.log(`[로그아웃 요청에 성공!]\n${res.data.message}`);
  //     })
  //     .catch((error) => {
  //       console.log(`[로그아웃 오류]${error}`);
  //       alert("로그아웃 실패!");
  //     });
  // };

  const LogOut = () => {
    const LogOutURL = "v1/auth/signout"; // 1. 함수명과 겹치지 않게 변수명 변경
    const Token = localStorage.getItem("accessToken"); // 2. 로컬 스토리지에서 토큰 가져오기

    apiInstance
      .post(
        LogOutURL,
        {}, // 3. POST 요청 시 body 데이터가 없다면 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${Token}`, // 4. 헤더에 인증 토큰 추가
          },
        }
      )
      .then((res) => {
        console.log(`[로그아웃 요청에 성공!]\n${res.data.message}`);
        alert("로그아웃 되었습니다.");

        // 5. [중요] 로컬 스토리지에서 로그인 정보 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("IsLoginned");

        // 6. [중요] 페이지를 새로고침하여 컴포넌트가 새 상태를 읽도록 함
        window.location.reload();
        // 또는 MoveToLogin('/login'); 를 사용하여 로그인 페이지로 이동시킬 수도 있습니다.
      })
      .catch((error) => {
        console.log(`[로그아웃 오류]${error}`);

        // 7. (선택 사항) 토큰 만료 등으로 401 오류가 나도, 클라이언트에선 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("IsLoginned");
        alert("로그아웃 처리 중 오류가 발생했습니다.");
        window.location.reload();
      });
  };

  return (
    <>
      <div className="nav">
        <h2 className="logo">돌려돌려LP판</h2>

        <span>
          {status ? (
            <>
              <button onClick={sendToken}>내정보</button>
              <button onClick={LogOut}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>로그인</button>
              </Link>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
            </>
          )}
        </span>
      </div>
    </>
  );
}

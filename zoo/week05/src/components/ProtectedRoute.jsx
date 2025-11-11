import React from "react";
import { Navigate, useLocation } from "react-router-dom";
//우선, 사용자가 로그인을 했는지 확인 -> 아니면 내쫓기
//그렇다면 특정 페이지에 접근시키기 전에 여기로 오게 하면됨
//그래서 "문지기"컴포넌트라고 함
//그리고 안에는 children을 받아서 감싸는역할을 할 수 있음

export default function ProtectedRoute({ children }) {
  //토큰 확인
  const isLogin = Boolean(localStorage.getItem("token"));
  //토큰이 있으면 true, 없으면 false-> 현 위치 저장
  const location = useLocation();

  if (!isLogin) {
    //로그인 안된 상태-> 로그인 페이지로 이동
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //replace의 덫에 걸리게되는 경우 : 계속해서 왔다갔다 -> 현재페이지를 히스토리에서 덮어써서 로그인 페이지로 대체replace
//mypage가 현재페이지로 덮어써짐 - replace
//from : 원래가려던 곳 알려줌

  //로그인 된 상태-> 감싸진 컴포넌트 렌더링
  return children;
}

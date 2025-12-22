import React, { createContext, useContext, useEffect, type ReactNode } from "react"
import { useState } from "react"


interface SidebarContextType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SidebarContextType|null>(null)

export function SideBarProvider({children}:{children:ReactNode}) {
    const [isOpen, setOpen] = useState(true)

    return (
        <SideBarContext.Provider value={{isOpen,setOpen}}>
            {children}
        </SideBarContext.Provider>
    )
}
export function useSidebar() {
  const context = useContext(SideBarContext);
  if (!context) {
    // context가 null(기본값)이면 Provider로 감싸지지 않았다는 뜻
    throw new Error('Cannot use useSidebar outside of SidebarProvider');
  }
  return context;
}

interface AuthContextType {
  isLogin: boolean;
  userName : string|null;
  loginProc: (token: string, name: string) => void;
  logoutProc : () => void;
}
export const LoginContext = createContext<AuthContextType|null>(null)

export function LoginProvider({children}:{children:ReactNode}) {

  const [isLogin, setIsLogin] = useState(false)
  const [userName, setUserName] = useState<string|null>('')
  //useEffect를 한 이유: 새로고침을 할 경우 로그인 상태가 풀리게 된다. 따라서 토큰이 있다면 새로고침을 하더라도 유지가 되도록 만든 장치
  useEffect(()=>{
    const Token = localStorage.getItem('accessToken');
    const name= localStorage.getItem('userName');
    if (Token) {
      setIsLogin(true)
      setUserName(name)
    }
  },[])
  // 중요한 포인트는 로그인 버튼 을 눌렀을때, true, 로그아웃 버튼을 눌렀을때, false로 처리하기 위해 따로 만들어준 함수
  const loginProc = (token:string, name:string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', name);
    setIsLogin(true);
    setUserName(name);
  };


  const logoutProc = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('status'); 
    localStorage.removeItem('logout'); 
    setIsLogin(false);
    setUserName('');
  };
  return (
    <LoginContext.Provider value={{ isLogin, userName, loginProc, logoutProc }}>
      {children}
    </LoginContext.Provider>
  )
}
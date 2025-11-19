import React, { createContext, useContext, type ReactNode } from "react"
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
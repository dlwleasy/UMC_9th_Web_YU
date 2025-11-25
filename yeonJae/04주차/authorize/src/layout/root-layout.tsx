import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbars';
import { useSidebar } from '../components/contextapi';
import { AddLP } from '../pages/addLP';
import { useState } from 'react';


const Rootlayout = () => {

    const {isOpen,setOpen} = useSidebar()
    const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 사이드 여는 함수(+ 버튼 관련이야)
    const openModal = () => {
    setIsModalOpen(true);
    };

  // 2. 사이드를 닫는 함수(+ 버튼 관련이야)
    const closeModal = () => {
    setIsModalOpen(false);
    };
    
    return (
        <>
            <Navbar></Navbar>
            <main>
                {/* 삼항 연산자로 클래스 이름을 달리하여 닫을시 열었을시의 스타일을 구분함.*/}
                <div className={`SideBar ${isOpen? '':'SideBar-closed'}`}></div>
                <Outlet></Outlet>
                <button className="button-sticky" onClick={openModal}>+</button>
                {isModalOpen && <AddLP close={closeModal}></AddLP>}
            </main>
        </>
    )
}

export default Rootlayout
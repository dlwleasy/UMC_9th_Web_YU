import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbars';
import { useSidebar } from '../components/contextapi';
import { AddLP } from '../pages/addLP';
import { useState } from 'react';


const Rootlayout = () => {
    const {isOpen,setOpen} = useSidebar()
    const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. 모달을 여는 함수
    const openModal = () => {
    setIsModalOpen(true);
    };

  // 4. 모달을 닫는 함수
    const closeModal = () => {
    setIsModalOpen(false);
    };
    
    return (
        <>
            <Navbar></Navbar>
            <main>
                <div className={`SideBar ${isOpen? '':'SideBar-closed'}`}></div>
                <Outlet></Outlet>
                <button className="button-sticky" onClick={openModal}>+</button>
                {isModalOpen && <AddLP close={closeModal}></AddLP>}
            </main>
        </>
    )
}

export default Rootlayout
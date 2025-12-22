import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbars';
import { useSidebar } from '../components/contextapi';
import { AddLP } from '../pages/addLP';
import Open_Close from './Hooks'

const Rootlayout = () => {

    const {isOpen} = useSidebar()
    const {openModal, closeModal, isModalOpen} = Open_Close()
    
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
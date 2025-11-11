import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbars';

const Rootlayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <main>
                <div className='SideBar'></div>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default Rootlayout
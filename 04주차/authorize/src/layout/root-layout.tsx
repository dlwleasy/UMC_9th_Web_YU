import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbars';

const Rootlayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    )
}

export default Rootlayout
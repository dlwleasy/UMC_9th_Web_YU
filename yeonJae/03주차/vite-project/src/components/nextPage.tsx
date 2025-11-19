import { useContext } from 'react'
import {MoviesContext} from '../context/moviesContext'


const NextPageButton = () => {
    const context = useContext(MoviesContext)
    return (
        <>
            <nav className="Nav_button--container">
                <div className="Nav_buttons">
                    <button className="Nav_button--left" onClick={context?.PrevPage}>&lt;&lt;</button>
                        {context?.PageNum}
                    <button className="Nav_button--right" onClick={context?.NextPage}>&gt;&gt;</button>
                </div>
            </nav>
        </>
    )
}

export default NextPageButton
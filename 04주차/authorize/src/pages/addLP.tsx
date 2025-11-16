import type { MouseEventHandler } from "react"
import recordImage from '../img/e278ed6d-4722-4e6d-bd30-7815c5b10c15.jpg'

export const AddLP = ({close}:{close:()=>void}) => {

    return (
        <>
        <div className="AddLP_background" onClick={close}>
            <div className="LP_container">
                <img src={recordImage}></img>
                <input className="LP_NAME" placeholder="LP Name"></input>
                <input className="LP_content" placeholder="LP Content"></input>
                <input className="LP_TAG" placeholder="LP Tag"></input>
                <button className="Add">add</button>
                <button className="Submit">submit</button>
            </div>
        </div>
        </>
    )
}
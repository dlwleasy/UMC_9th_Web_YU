import type { MouseEventHandler } from "react"
import recordImage from '../img/e278ed6d-4722-4e6d-bd30-7815c5b10c15.jpg'
import { useParams } from "react-router-dom"

export const AddLP = ({close}:{close:()=>void}) => {
    


    return (
        <>
        <div className="AddLP_background">
            <div className="LP_container">
                <button onClick={close}>X</button>
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
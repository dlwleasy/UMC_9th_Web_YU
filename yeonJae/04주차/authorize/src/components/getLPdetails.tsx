import { useState, type Key } from "react"
import { GetLPdetails } from "../hooks/ToggleHook"
import { useNavigate } from "react-router-dom";

interface ItemType { id: Key | null | undefined; thumbnail: any; }

interface props {
    item : ItemType
}
export const GETLP = (item:props) => {
    const move_to_LPdetails= useNavigate()
    const [isHovered, setHover] = useState<any>(false)
    console.log('현재 마우스가 선택한 것', item.item.id)
    const {data, isLoading, isError, error} =GetLPdetails(item.item.id)
    console.log('LP 상세정보 From GETLP',data)
    return (
        <>
        <article className="LP_bowls" 
        onMouseEnter={():void => setHover(item.item.id)} 
        onMouseLeave={():void => setHover(false)}
        onClick={()=>(move_to_LPdetails(`LPdetails/${item.item.id}`))}
        >
            <img key={item.item.id} src={`${item.item.thumbnail}`} className="LP_img">
            </img>
            {isHovered == item.item.id &&(
                <p className="simple_LP_info">
                        <strong>{data?.data.data.title}</strong><br></br>
                        ♡{data?.data.data.likes.id}
                </p>)
            }
        </article>
        </>
    )
}
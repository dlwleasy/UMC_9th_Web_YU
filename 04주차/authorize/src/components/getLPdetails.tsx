import { useState, type Key } from "react"
import { GetLPdetails } from "../hooks/ToggleHook"

interface ItemType { id: Key | null | undefined; thumbnail: any; }

interface props {
    item : ItemType
}



export const GETLP = (item:props) => {
    const [isHovered, setHover] = useState<any>(false)
    console.log('현재 마우스가 선택한 것', item.item.id)
    const {data, isLoading, isError, error} =GetLPdetails(item.item.id)
    console.log('LP 상세정보 From GETLP',data)
    return (
        <>
        <article className="LP_bowls" 
        onMouseEnter={():void => setHover(item.item.id)} 
        onMouseLeave={():void => setHover(false)}>
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
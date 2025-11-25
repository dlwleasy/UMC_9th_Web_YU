import { useState, type Key } from "react"
import { GetLPdetails } from "../hooks/ToggleHook"
import { useNavigate } from "react-router-dom";


interface ItemType { id: Key | null | undefined; thumbnail: any; }

interface props {
    item : ItemType
}



export const GETLP = (item:props) => {
    

    const move_to_LPdetails= useNavigate()
    const ProtectedNavigate = () => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            move_to_LPdetails(`LPdetails/${item.item.id}`)
        }else {
            console.log(token)
            alert('로그인 후 사용가능한 서비스입니다.')
        }

    }
    const [isHovered, setHover] = useState<any>(false)

    //확인용 로그
    console.log('현재 마우스가 선택한 것', item.item.id)


    //카드에 띄울 정보를 가져오는 함수 (contextapi 파일에 있어)
    const {data} =GetLPdetails(item.item.id)

    //확인용 로그
    console.log('LP 상세정보 From GETLP',data)

    return (
        <>
        <article className="LP_bowls" 
        onMouseEnter={():void => setHover(item.item.id)} 
        onMouseLeave={():void => setHover(false)}
        onClick={()=>(
            ProtectedNavigate()
        )}
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
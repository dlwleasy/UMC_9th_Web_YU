import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState, type Key } from "react";
import {useInView} from 'react-intersection-observer'
import Switch from '@mui/material/Switch'
import { GETLP } from "./getLPdetails";
import Skeleton from "@mui/material/Skeleton";

const LimitNum=10
async function fetchLP({pageParam=1,sort}:{pageParam?:number,sort?:'asc' | 'desc'}) {
    const res = await fetch(`http://localhost:8000/v1/lps?cursor=${pageParam}&limit=${LimitNum}&order=${sort}`)
    if (!res.ok) throw new Error("데이터 요청에 실패!") 
    const data = await res.json();
    console.log(`[요청에 성공!]\n${res}\n[요청에 성공!]`)
    console.log('받은 데이터',data)
    return data
}
export default function Infinite() {
    const { ref, inView } = useInView();
    const [isHovered, setHover] = useState<any>(false)
    const [checked, setCheck] = useState(false)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked)
    }

    const latestOrOld: 'asc' | 'desc'= checked ? 'asc' : 'desc'

    const {data,status, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, isLoading} = useInfiniteQuery({
        queryKey:['LPs',latestOrOld],
        queryFn: ({pageParam})=> fetchLP({pageParam, sort:latestOrOld}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data.nextCursor
        }
    })
    useEffect(
        ()=>{if (inView&&hasNextPage&&!isFetchingNextPage) {
                fetchNextPage();
            }},[inView, hasNextPage, isFetchingNextPage, fetchNextPage])
    if(status=='error') {
        return <div> 에러 발생 </div>
    }
    
    
    
    return (
        <>
            <Switch className="Swiching_Button" onChange={handleChange} checked={checked}></Switch>
            <div className='show-LP_container'>
                    <div className='show-LP'>
                        {isLoading? Array.from(new Array(10)).map((_,index)=><Skeleton animation="wave" variant="rectangular" key={index} width={200} height={200} sx={{ bgcolor: 'grey.400' }}/>):data?.pages.map((page,i)=>(
                            page.data.data.map((item: { id: Key | null | undefined; thumbnail: any; },j: any)=>(
                                <GETLP item={item}>
                                </GETLP>
                            ))
                        ))}
                        {isFetchingNextPage && (
                         Array.from(new Array(10)).map((_,index)=><Skeleton key={index} animation="wave" variant="rectangular" width={200} height={200} sx={{ bgcolor: 'grey.400' }}/>
                    ))}
                        <div className="check_infinite" ref={ref}>한재연</div>
                    </div>
            </div>
        </>
    )
};
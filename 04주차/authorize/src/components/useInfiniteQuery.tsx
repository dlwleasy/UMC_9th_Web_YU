import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {useInView} from 'react-intersection-observer'

const LimitNum=10
async function fetchLP({pageParam=1}:{pageParam?:number}) {
    const res = await fetch(`http://localhost:8000/v1/lps?cursor=${pageParam}&limit=${LimitNum}`)
    if (!res.ok) throw new Error("데이터 요청에 실패!") 
    const data = await res.json();
    console.log(`[요청에 성공!]\n${res}\n[요청에 성공!]`)
    console.log('받은 데이터',data)
    return data
}

export default function Infinite() {
     const { ref, inView } = useInView();

    const {data,status, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey:['LPs'],
        queryFn: ({pageParam})=> fetchLP({pageParam}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data.nextCursor
        }
    })
    useEffect(
        ()=>{if (inView&&hasNextPage&&!isFetchingNextPage) {
                fetchNextPage();
            }},[inView, hasNextPage, isFetchingNextPage, fetchNextPage])
    if (status=="pending") {
        return <div>로딩 중...</div>
    }
    if(status=='error') {
        return <div> 에러 발생 </div>
    }

    
    return (
        <>
            <div className='show-LP_container'>
                    <div className='show-LP'>
                        {data.pages.map((page,i)=>(
                            page.data.data.map((item,j)=>(
                                    <img key={item.id} src={`${item.thumbnail}`} className="LP_img">
                                    </img>
                            ))
                        ))}
                        <div className="check_infinite" ref={ref}>한재연</div>
                    </div>
            </div>
        </>
    )
};
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { type InfiniteData, type UseInfiniteQueryResult, } from "@tanstack/react-query";
import axios from "axios";
import { useState, type Key } from "react";
import { apiInstance } from "../components/axios";
import type { CommentListResponse } from "../pages/type";


function CheckID() {
    const [ID, setID] = useState('')
    
    const handleValueCheck = (e:any) => {
        setID(e.target.value)
        return ID.includes('@') && ID.includes('.')
    }
    return [ID, handleValueCheck]
}

function CheckPassword() {
    const [Password, setPassword] = useState('')

    const handleValueCheck = (e:any) => {
        setPassword(e.target.value)
        return Password.length >= 6
    }

    return [Password, handleValueCheck]
}

export default CheckID; CheckPassword

const GetLP = async (GetLPurl:string) => {
            const response  = await axios.get(GetLPurl)

            console.log('LP의 상세 정보입니다!\n',response)
            return response
        }
export function GetLPdetails(ID:Key | null | undefined) {
    const GetLPurl = `http://localhost:8000/v1/lps/${ID}`
    const {data, isLoading, isError, error} = useQuery({
        queryKey:['LPs_Detail',ID],
        queryFn: () => GetLP(GetLPurl)})
    return {data, isLoading, isError, error}
}

const LimitNum = 10
const GetComment = async (ID:number, pageParam:number=1, order: 'asc'|'desc'): Promise<CommentListResponse> => {
    const GetCommentURL = `http://localhost:8000/v1/lps/${ID}/comments?cursor=${pageParam}&limit=${LimitNum}&order=${order}`
    console.log(GetCommentURL,'실행된 url')
    const {data} = await apiInstance.get<CommentListResponse>(GetCommentURL)
    console.log(data,'from togglehook')
    return data
}


export function Infinte_get_Comment(ID:number|any, order: 'asc'|'desc'): UseInfiniteQueryResult<InfiniteData<CommentListResponse>, Error> {
    console.log('🔥 Infinte_get_Comment 호출됨', ID, order)
    return useInfiniteQuery({
        queryKey: ['lpComments', ID, order],
        queryFn : ({pageParam}) => {
            console.log('🔥 Fn 호출됨', pageParam)
            return GetComment(ID,pageParam,order)},
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.data.nextCursor
        }
    })
    
}
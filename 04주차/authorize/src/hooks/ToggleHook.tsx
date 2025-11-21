import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, type Key } from "react";


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
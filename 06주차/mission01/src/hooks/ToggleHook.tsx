import { useState } from "react";


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
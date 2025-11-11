import { createContext, useState } from "react";
import type {PropsWithChildren} from 'react'

interface IMovieContext {
    PrevPage: () => void;
    NextPage: () => void;
    PageNum: number;
}

export const MoviesContext = createContext<IMovieContext|undefined>(undefined)

export const MoviesProvider = ({children}: PropsWithChildren) => {
    const [PageNum, setPageNum] = useState<number>(1)

    const PrevPage = ():void => (
        setPageNum((PrevPageNum) => PrevPageNum - 1)
    )
    const NextPage = ():void => (
        setPageNum((PrevPageNum) => PrevPageNum + 1)
    )

    return <MoviesContext.Provider value={{PrevPage, NextPage,PageNum}}>
        {children}
    </MoviesContext.Provider>
}
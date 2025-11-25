import {useEffect, useState} from "react";

interface User

export const useCustomFetch = <T>(url: string) : {data:any} => {
const [data, setData] = useState<T | null>(null);

  useEffect((): void=> {
    const fetchData = async (): Promise<void> => {
    const response = await fetch(url);
    const data = (await response.json()) as T;
    setData(data);
  };

  fetchData();
},[url]);


return {data};
};

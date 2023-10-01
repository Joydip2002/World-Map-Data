import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const ApiContext = createContext();
const baseURL = 'https://restcountries.com/v3.1';
const API = `${baseURL}/all`;

export function ApiProvider({children}){
    const [getApiData,setApiData] = useState('');

    const getApiFunc= async(url)=>{
        const res = await axios.get(url);
        setApiData(res.data);
    }

    useEffect(()=>{
        getApiFunc(API);
    },[]);

    return(
        <ApiContext.Provider value={{data : getApiData}}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(){
    return useContext(ApiContext);
}
import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";




export function useFetch<T = unknown>(url:string){
    const [data, setData]:any = useState();
    const [isFetching, setIsFetching] = useState(true);
    const {userId} = useContext(AuthContext);

    const token = sessionStorage.getItem('tokenAuth');
    
    useEffect(()=>{
        try{
           axios.get(url, {
                params:{
                    id: userId},
                headers: {
                    'Authorization': `Bearer ${token}`
                }  
            }).then(response =>{
                setData(response.data);
                setIsFetching(false);
                console.log(response.data);

        });
        }catch(error){
            console.log(error)
            setIsFetching(true);
        }
    }, [userId])
    
    return { data, isFetching }

}
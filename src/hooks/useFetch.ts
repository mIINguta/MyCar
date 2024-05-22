import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url:string){
    const [data, setData]:any = useState();
    const userId = sessionStorage.getItem('user_id');
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
                console.log(response.data);
        });
        }catch(error){
            console.log(error)
        }
    }, [])

    return { data }

}
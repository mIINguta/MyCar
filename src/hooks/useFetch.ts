import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export function useFetch<T = unknown>(url:string){
    const [data, setData]:any = useState();
    const [isFetching, setIsFetching] = useState(true);
    const {userId, userToken} = useContext(AuthContext);

    
useEffect(()=>{
        async function getItems(){
        try{
           await axios.get(url, {
                params:{
                    id: (userId || sessionStorage.getItem('user_id'))},
                headers: {
                    'Authorization': `Bearer ${userToken || sessionStorage.getItem('tokenAuth')} `
                }  
            }).then(response =>{
                setData(response.data);
                console.log(response.data);
        });
        }catch(error){
            console.log(error);
        }finally{
            setIsFetching(false);
        }
    } 
    getItems();

    }, [])

    return { data, isFetching }

}
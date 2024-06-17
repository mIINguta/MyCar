import { useContext } from "react";
import Aside from "../components/Aside";
import { AuthContext } from "../Context/AuthContext";

export default function Cadastrar(){

const {userEmail} = useContext(AuthContext);
    return (
        <>
        <Aside 
            userName = {userEmail}/>
        </>
    )
}
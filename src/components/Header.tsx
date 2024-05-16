import React from "react";

export default function Header(){
    return(
        <>
        <header>
            <h3>Oi, {sessionStorage.getItem('userToken')}</h3>
        </header>
        </>
    )
}
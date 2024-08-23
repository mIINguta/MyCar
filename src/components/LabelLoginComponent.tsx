import React from "react";
import LoginStyle from '../styles/LoginStyle.scss';



export default function LabelLoginComponent(props:any){
    return (
        <>
        <label className="labelForm" >
           <input type={props.type} name={props.name} id={props.id} required autoFocus placeholder={props.placeholder} onChange={props.change} value={props.value}/>
           <i className={props.IClassName}></i>
        </label>
        </>
    )
}
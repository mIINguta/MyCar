import React from "react";
import LoginStyle from '../styles/LoginStyle.scss';



export default function LabelLoginComponent(props:any){
    return (
        <>
        <label className="labelForm" >
           <input type={props.type} name={props.name} id={props.id} required placeholder={props.placeholder} onChange={props.change} value={props.value} className={props.className} onClick={props.onClick} onFocus={props.onFocus}
           />
           <i className={props.IClassName}></i>
        </label>
        </>
    )
}
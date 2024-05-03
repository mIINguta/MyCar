import React from "react";
import LoginStyle from '../styles/LoginStyle.scss';



export default function LabelLoginComponent(props:any){
    return (
        <>
        <label className="labelForm" >
           <input type="text" name={props.name} id={props.id} autoFocus required placeholder={props.placeholder} onChange={props.change}/>
           <i className={props.IClassName}></i>
        </label>
        </>
    )
}
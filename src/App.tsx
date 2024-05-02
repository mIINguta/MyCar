import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios';
import Login from './pages/Login';
import { Route, Router, BrowserRouter, Link, Routes } from 'react-router-dom';


export default function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Login/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </>
  )
}



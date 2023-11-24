import React, { useEffect } from 'react'
import style from './LandingPage.module.css';
import { Link } from "react-router-dom";


export const LandingPage = () => {
 
  return (
    <div className={style.demo}>        
        <Link to={`/home`}>
           <h2>Landing Page</h2>                  
         </Link>
    </div>
  )
}

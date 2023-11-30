import React, { useEffect } from 'react'
import style from './LandingPage.module.css';
import { Link } from "react-router-dom";

export const LandingPage = () => {
   
  return (
    <div className={style.demo}>            
        <img src='../../../public/images/pokeball.png' alt="" className={style.img_pokebola}/>
        <Link to={`/home`}>
           <h1 className={style.btn}>Poké Dex</h1>                  
        </Link>
    </div>
  )
}

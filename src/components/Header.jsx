import React from 'react'
import './styleComponents/header.module.scss'

export default function Header(){
    return(
        <section id='section'>
             <p> <img src="logo.png" className="logo" sizes='51px' alt="logo de pato da marca" /> Ah, cadê mia?</p>
        </section>
    )
}
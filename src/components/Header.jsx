import React from 'react'
import './styleComponents/header.module.scss'

export default function Header(){
    return(
        <section>
            <img src="logo.png" className="logo" sizes='51px' alt="logo de pato da marca" /> <p>Ah, cadê mia?</p>
        </section>
    )
}
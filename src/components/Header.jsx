import React from 'react'
import styles from './styleComponents/header.module.scss'

export default function Header() {
    return (
        <>
            <section className={styles.sectionHeader}>
                <p><img src="logo.png" className="logo" sizes='51px' alt="logo de pato da marca" /> Ah, cadê mia?</p>
            </section>
        </>

    )
}
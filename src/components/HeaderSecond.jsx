import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styleComponents/headerSecond.module.scss'

export default function HeaderSecond() {
    const navigate = useNavigate()
    function linkTo(param) {
        navigate(`/${param}`)
    }
    return (
        <div className={styles.sectionHeaderSecond}>
            <button onClick={() => linkTo('')}><ArrowLeftOutlined/></button>
            <h3> Criar cliente </h3>
        </div>
    )
}
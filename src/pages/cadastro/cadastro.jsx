import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons'
import './style.scss'
const Cadastro = () => {
    const navigate = useNavigate()
    function backHome(){
        navigate('/')
    }
    return (
        <div>
            <div className="body-1">
                <button onClick={()=>backHome()}><ArrowLeftOutlined /></button>
                <h3> Criar cliente </h3>
            </div> 
            <section></section>
        </div>
    )
}

export default Cadastro;
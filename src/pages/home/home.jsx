import { Button } from "antd";
import './style.scss'
import 'antd/dist/reset.css';
import Header from "../../components/Header";
const Home = () => {
    return (
        <>
            <div>
                <Header titulo="Ah, cadê miaaa?" />
            </div>
            <div className="body">
                <Button style={{margin:'12px', borderRadius:'500px'}} onClick={() => { }} type="default" >Criar cliente</Button>
                <Button style={{margin:'12px', borderRadius:'500px'}} onClick={() => { }} type="default" >Listar clientes</Button>
                <Button style={{margin:'12px', borderRadius:'500px'}} onClick={() => { }} type="default" >Listar pagamentos</Button>
                <Button style={{margin:'12px', borderRadius:'500px'}} onClick={() => { }} type="default" >Efetuar pagamento</Button>
            </div>
        </>
    )
}
export default Home;
import { Button, DatePicker, Form, Input, Modal } from "antd"
import { useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './style.scss'
import 'antd/dist/reset.css';
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const dateFormatList = 'DD/MM/YYYY';
const Home = () => {
    const navigate = useNavigate()
    function linkTo(param) {
        navigate(`/${param}`)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="body">
                <Button style={{ margin: '12px', borderRadius: '500px', minWidth: '200px' }} onClick={() => linkTo('cadastro')} type="default" >Criar cliente</Button>
                <Button style={{ margin: '12px', borderRadius: '500px', minWidth: '200px' }} onClick={() => linkTo('listarClientes')} type="default" >Listar clientes</Button>
                <Button style={{ margin: '12px', borderRadius: '500px', minWidth: '200px' }} onClick={() => linkTo('listarPagamentos')} type="default" >Listar pagamentos</Button>
                <Button style={{ margin: '12px', borderRadius: '500px', minWidth: '200px' }} onClick={() => showModal()} type="default" >Efetuar pagamento</Button>
            </div>
            <Modal title="Efetuar pagamento" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form className='form'>
                    <Form.Item >
                        <Input placeholder='Valor: ' type='number' />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker defaultValue={dayjs('01/01/2023', dateFormatList)} format={dateFormatList} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ borderRadius: '500px', minWidth: '200px', width: '100%' }} htmlType='submit' type='primary' onClick={() => linkTo('listarPagamentos')}>Efetuar pagamento</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default Home;
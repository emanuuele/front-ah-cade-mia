import { Button, DatePicker, Form, Input } from 'antd';
import './style.scss'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from 'react-router-dom';
import HeaderSecond from '../../components/HeaderSecond';
dayjs.extend(customParseFormat);
const dateFormatList = 'DD/MM/YYYY';

const Cadastro = () => {
    const navigate = useNavigate()
    function linkTo(param) {
        navigate(`/${param}`)
    }
    return (
        <div>
            <HeaderSecond titulo= "Criar cliente"/>
            <section className='section-form'>
                <Form className='form'>
                    <Form.Item >
                        <Input placeholder='Nome completo: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Idade: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Peso: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Altura: ' />
                    </Form.Item>
                    <Form.Item name="date-picker" label='Data de nascimento'>
                        <DatePicker defaultValue={dayjs('01/01/2023', dateFormatList)} format={dateFormatList} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ borderRadius: '500px', minWidth: '200px', width: '100%' }} htmlType='submit' type='primary' onClick={() => linkTo('listarClientes')}>Criar cliente</Button>
                    </Form.Item>
                </Form>
            </section>
        </div >
    )
}

export default Cadastro;
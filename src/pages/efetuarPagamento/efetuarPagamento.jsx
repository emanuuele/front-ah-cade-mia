import { Button, DatePicker, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import HeaderSecond from "../../components/HeaderSecond";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

const EfetuarPagamento = () => {
    const navigate = useNavigate()
    function linkTo(param) {
        navigate(`/${param}`)
    }
    dayjs.extend(customParseFormat);
    const dateFormatList = 'DD/MM/YYYY';
    return (
        <>
            <HeaderSecond titulo="Efetuar pagamento" />
            <section className='section-form'>
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
            </section>
        </>
    )
}
export default EfetuarPagamento;
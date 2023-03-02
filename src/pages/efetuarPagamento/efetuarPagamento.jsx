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
                
            </section>
        </>
    )
}
export default EfetuarPagamento;
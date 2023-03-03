import { Button, DatePicker, Form, Input } from 'antd';
import './style.scss'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from 'react-router-dom';
import HeaderSecond from '../../components/HeaderSecond';
import { useState } from 'react';
dayjs.extend(customParseFormat);
const dateFormatList = 'DD/MM/YYYY';

const Cadastro = () => {
    const navigate = useNavigate()
    function linkTo(param) {
        navigate(`/${param}`)
    }
    let data;
    let dia = new Date().getDate()
    let mes = new Date().getMonth()
    let ano = new Date().getFullYear()

    if (dia < 10 && mes < 10) {
        dia = `0${dia}`
        mes = `0${mes}`
        data = `${dia}/${mes}/${ano}`
    } else if (dia > 10 && mes < 10) {
        dia = dia
        mes = `0${mes}`
        data = `${dia}/${mes}/${ano}`
    } else if (dia < 10 && mes > 10) {
        dia = `0${dia}`
        mes = mes
        data = `${dia}/${mes}/${ano}`
    }
    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState(null)
    const [peso, setPeso] = useState(null)
    const [altura, setAltura] = useState(null)
    const [nascimento, setNascimento] = useState(data)
    const [ultimoPagamento, setUltimoPagamento] = useState(data)
    console.log(data)
    const client = {
        nome: nome,
        idade: idade,
        peso: peso,
        altura: altura,
        nascimento: nascimento,
        ultimoPagamento: ultimoPagamento
    }
    const clients=[]
    clients.unshift(client)
    console.log(clients)
    return (
        <div>
            <HeaderSecond titulo="Criar cliente" />
            <section className='section-form'>
                <Form className='form'>
                    <Form.Item >
                        <Input placeholder='Nome completo: ' value={nome} onChange={e => setNome(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Idade: ' value={idade} onChange={e => setIdade(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Peso: ' value={peso} onChange={e => setPeso(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Input type='number' placeholder='Altura: ' value={altura} onChange={e => setAltura(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="date-picker">
                        <DatePicker
                            defaultValue={dayjs(data, dateFormatList)}
                            format={dateFormatList}
                            placeholder='Data de nascimento:'
                            value={nascimento}
                            onChange={(e) => {setNascimento(e.format(dateFormatList))}} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{ borderRadius: '500px', minWidth: '200px', width: '100%' }}
                            htmlType='submit'
                            type='primary'
                            onClick={() => linkTo('listarClientes')}>Criar cliente</Button>
                    </Form.Item>
                </Form>
            </section>
        </div >
    )
}

export default Cadastro;
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
    
    let dia = new Date().getDate()
    let mes = new Date().getMonth()+1
    let ano = new Date().getFullYear()
    let dataHoje
    if(dia<10 && mes<10){
         dataHoje = `0${dia}/0${mes}/${ano}`
    } else if(dia<10 && mes>=10){
         dataHoje = `0${dia}/${mes}/${ano}`
    } else if(dia>=10 && mes<10){
         dataHoje = `${dia}/${mes}/${ano}`
    }
    const [nome, setNome]=useState('')
    const [idade, setIdade]=useState(null)
    const [altura, setAltura]=useState(null)
    const [peso, setPeso]=useState(null)
    const [nascimento, setNascimento]=useState(dataHoje)
    const [ultimoPagamento, setUltimoPagamento]=useState(dataHoje)
    const cliente={
        nome: nome,
        idade: idade,
        altura: altura,
        nascimento: nascimento,
        peso: peso,
        ultimoPagamento: ultimoPagamento
    }
    console.log(cliente)
    return (
        <div>
            <HeaderSecond titulo= "Criar cliente"/>
            <section className='section-form'>
                <Form className='form'>
                    <Form.Item >
                        <Input value={nome} onChange={e => setNome(e.target.nome)} placeholder='Nome completo: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input value={idade} onChange={e => setIdade(e.target.idade)} type='number' placeholder='Idade: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input value={peso} onChange={e => setPeso(e.target.peso)} type='number' placeholder='Peso: ' />
                    </Form.Item>
                    <Form.Item>
                        <Input value={altura} onChange={e => setAltura(e.target.altura)} type='number' placeholder='Altura: ' />
                    </Form.Item>
                    <Form.Item name="date-picker" label='Data de nascimento'>
                        <DatePicker value={nascimento} onChange={e => setNascimento(e.target.nascimento)} defaultValue={dayjs(dataHoje, dateFormatList)} format={dateFormatList} />
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
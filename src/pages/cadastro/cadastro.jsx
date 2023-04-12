import { Button, DatePicker, Form, Input } from "antd";
import "./style.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import HeaderSecond from "../../components/HeaderSecond";
import React, { useState } from "react";
import api from "../../services/api";
dayjs.extend(customParseFormat);
const dateFormatList = "DD/MM/YYYY";

const Cadastro = () => {
  const navigate = useNavigate();
  function linkTo(param) {
    navigate(`/${param}`);
  }
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(null);
  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);
  const [nascimento, setNascimento] = useState('');

  async function createClient() {
    let ultimoPagamento = new Date();
    let ultimoPagamentoString = ultimoPagamento.toISOString().slice(0, 10);
    const clientData = {
      nome: nome,
      idade: idade,
      peso: peso,
      altura: altura,
      nascimento: nascimento.format(dateFormatList),
      ultimoPagamento: ultimoPagamentoString,
    };

    await api().post("/clients", { clientData });
    linkTo("/listarClientes");
  }
  return (
    <div>
      <HeaderSecond titulo="Criar cliente" />
      <section className="section-form">
        <Form className="form">
          <Form.Item>
            <label>Nome:</label>
            <Input
              autoFocus
              placeholder="Nome completo: "
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label>Idade:</label>
            <Input
              type="number"
              placeholder="Idade: "
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label>Peso:</label>
            <Input
              type="number"
              placeholder="Peso: "
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label>Altura:</label>
            <Input
              type="number"
              placeholder="Altura: "
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="date-picker" label="Data de nascimento">
            <DatePicker
              // defaultValue={moment('2023-12-12', dateFormatList)}
              format={dateFormatList}
              placeholder="Data de nascimento:"
              value={nascimento}
              onChange={(e) => {
                // setNascimento(e.format(dateFormatList));
                setNascimento(e);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                borderRadius: "500px",
                minWidth: "200px",
                width: "100%",
              }}
              htmlType="submit"
              type="primary"
              onClick={() => createClient()}
            >
              Criar cliente
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Cadastro;

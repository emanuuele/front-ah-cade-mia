import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.scss";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const Home = () => {
  let data;
  const navigate = useNavigate();
  function linkTo(param) {
    navigate(`/${param}`);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valor, setValor] = useState(null);
  const [ultimoPagamento, setUltimoPagamento] = useState(data);
  const [listaPagamentos, setListaPagamentos] = useState([]);

  function efetuarPagamento() {
    setListaPagamentos(() => {
      const newLista = [...listaPagamentos];
      newLista.unshift({
        valor: Number(valor),
        ultimoPagamento: ultimoPagamento,
      });
      console.log(newLista);
      return newLista;
    });
  }
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
        <Button
          style={{ margin: "12px", borderRadius: "500px", minWidth: "200px" }}
          onClick={() => linkTo("cadastro")}
          type="default"
        >
          Criar cliente
        </Button>
        <Button
          style={{ margin: "12px", borderRadius: "500px", minWidth: "200px" }}
          onClick={() => linkTo("listarClientes")}
          type="default"
        >
          Listar clientes
        </Button>
        <Button
          style={{ margin: "12px", borderRadius: "500px", minWidth: "200px" }}
          onClick={() => linkTo("listarPagamentos")}
          type="default"
        >
          Listar pagamentos
        </Button>
        
      </div>
      
    </>
  );
};
export default Home;

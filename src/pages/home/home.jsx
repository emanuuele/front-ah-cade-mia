import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.scss";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const dateFormatList = "DD/MM/YYYY";
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
      newLista.unshift({ valor: Number(valor), ultimoPagamento: ultimoPagamento });
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
        <Button
          style={{ margin: "12px", borderRadius: "500px", minWidth: "200px" }}
          onClick={() => showModal()}
          type="default"
        >
          Efetuar pagamento
        </Button>
      </div>
      <Modal
        title="Efetuar pagamento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Valor: "
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          type="number"
        />
        <Button
          onClick={() => efetuarPagamento(valor)}
          style={{ borderRadius: "500px", minWidth: "200px", width: "100%" }}
          htmlType="submit"
          type="primary"
        >
          Efetuar pagamento
        </Button>
      </Modal>
    </>
  );
};
export default Home;

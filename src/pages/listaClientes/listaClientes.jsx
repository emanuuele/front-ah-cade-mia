import { Button, Modal, Table } from "antd";
import {useState} from 'react'
import HeaderSecond from "../../components/HeaderSecond";
import "./style.scss";

const ListaClientes = () => {
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
  function excluirCliente() {}
  function editarCliente() {}
  const dataSource = [
    {
      key: "1",
      codigo: "1",
      nome: "emanuele",
      idade: "18",
      altura: "1,67",
      peso: "64,5",
      nascimento: "20/04/2004",
      acao: (
        <div>
          <Button
            style={{ margin: "12px", borderRadius: "500px" }}
            type="default"
            >
            Editar
          </Button>
          <Button
            style={{ margin: "12px", borderRadius: "500px" }}
            danger
            type="primary"
            onClick={() => showModal()}
          >
            Excluir
          </Button>
        </div>
      ),
      ultimoPagamento: "16/02/2023",
    },
  ];

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Idade",
      dataIndex: "idade",
      key: "idade",
    },
    {
      title: "Altura",
      dataIndex: "altura",
      key: "altura",
    },
    {
      title: "Peso",
      dataIndex: "peso",
      key: "peso",
    },
    {
      title: "Data de nascimento",
      dataIndex: "nascimento",
      key: "nascimento",
    },
    {
      title: "Último pagamento",
      dataIndex: "ultimoPagamento",
      key: "ultimoPagamento",
    },
    {
      title: "Ação",
      dataIndex: "acao",
      key: "acao",
    },
  ];
  return (
    <div>
      <HeaderSecond titulo="Listar clientes" />
      <section className="section">
        <Table dataSource={dataSource} columns={columns} />
        <Modal title="Deseja apagar o cliente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
      </section>
    </div>
  );
};
export default ListaClientes;

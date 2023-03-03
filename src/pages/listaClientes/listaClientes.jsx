import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import { useState } from "react";
import HeaderSecond from "../../components/HeaderSecond";
import "./style.scss";
import "../../style.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const dateFormatList = "DD/MM/YYYY";
const ListaClientes = () => {
  const [excluirModalOpen, setExcluirModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState(null);
  const handleOkExcluir = () => {
    setExcluirModalOpen(false);
  };
  const handleOkEditar = () => {
    setEditarModalOpen(false);
  };
  const handleCancel = () => {
    setExcluirModalOpen(false);
    setEditarModalOpen(false);
  };
  const excluirCliente = () => {
    setExcluirModalOpen(true);
  };
  const editarCliente = () => {
    setEditarModalOpen(true);
  };
  const dataSource = [];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
  const navigate = useNavigate();
  function linkTo(param) {
    navigate(`/${param}`);
  }
  return (
    <div>
      <HeaderSecond titulo="Listar clientes" />
      <section className="section-1">
        <div className="busca">
          <input
            type="text"
            placeholder="Pesquise por nome ou código:"
            className="search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <Button
            style={{ margin: "12px", borderRadius: "500px" }}
            htmlType="submit"
            type="primary"
          >
            Pesquisar
          </Button>
        </div>
        <div className="section-2">
          <div className="table-responsive">
            <Table dataSource={dataSource} columns={columns} />
          </div>
          {/* modal editar */}
          <Modal
            title="Deseja editar o cliente?"
            open={editarModalOpen}
            onOk={handleOkEditar}
            onCancel={handleCancel}
          >
            <Form className="form">
              <Form.Item>
                <Input placeholder="Nome completo: " />
              </Form.Item>
              <Form.Item>
                <Input type="number" placeholder="Idade: " />
              </Form.Item>
              <Form.Item>
                <Input type="number" placeholder="Peso: " />
              </Form.Item>
              <Form.Item>
                <Input type="number" placeholder="Altura: " />
              </Form.Item>
              <Form.Item name="date-picker" label="Data de nascimento">
                <DatePicker
                  defaultValue={dayjs("01/01/2023", dateFormatList)}
                  format={dateFormatList}
                />
              </Form.Item>
              <Form.Item name="date-picker" label="Último pagamento">
                <DatePicker
                  disabled
                  defaultValue={dayjs("01/01/2023", dateFormatList)}
                  format={dateFormatList}
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
                  onClick={() => linkTo("listarClientes")}
                >
                  Criar cliente
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          {/* modal excluir */}
          <Modal
            title="Deseja excluir o cliente?"
            open={excluirModalOpen}
            onOk={handleOkExcluir}
            onCancel={handleCancel}
          ></Modal>
        </div>
      </section>
    </div>
  );
};
export default ListaClientes;

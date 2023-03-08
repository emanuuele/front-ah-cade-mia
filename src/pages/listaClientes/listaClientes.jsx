import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import HeaderSecond from "../../components/HeaderSecond";
import "./style.scss";
import "../../style.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
const dateFormatList = "DD/MM/YYYY";

const ListaClientes = () => {
  const [excluirModalOpen, setExcluirModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);
  const [efetuarPagamento, setEfetuarPagamento] = useState(false);
  const [listClientsData, setListClientsData] = useState([]);
  const [pesquisa, setPesquisa] = useState(null);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(null);
  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);
  const [nascimento, setNascimento] = useState();
  const [id, setId] = useState(null);
  const [valor, setValor] = useState("");

  const handleOkEditar = () => {
    setEditarModalOpen(false);
    setEfetuarPagamento(false)
  };
  const handleCancel = () => {
    setExcluirModalOpen(false);
    setEditarModalOpen(false);
    setEfetuarPagamento(false)
  };
  const excluirCliente = () => {
    setExcluirModalOpen(true);
  };
  function editarCliente() {
    setEditarModalOpen(true);
  }
  function efetuarPagamentoa() {
    setEfetuarPagamento(true);
  }

  let data;
  let dia = new Date().getDate();
  let mes = new Date().getMonth() + 1;
  let ano = new Date().getFullYear();

  if (dia < 10 && mes < 10) {
    dia = `0${dia}`;
    mes = `0${mes}`;
    data = `${dia}/${mes}/${ano}`;
  } else if (dia > 10 && mes < 10) {
    dia = dia;
    mes = `0${mes}`;
    data = `${dia}/${mes}/${ano}`;
  } else if (dia < 10 && mes > 10) {
    dia = `0${dia}`;
    mes = mes;
    data = `${dia}/${mes}/${ano}`;
  }

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
      key: "acao",
      render: (param) => (
        <>
          <Button
            type="default"
            onClick={() => {
              setId(param.id);
              console.log(id);

              editarCliente();
            }}
            style={{ margin: "3px", borderRadius: "500px", minWidth: "50px" }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setId(param.id);
              excluirCliente();
            }}
            danger
            style={{ margin: "3px", borderRadius: "500px", minWidth: "50px" }}
          >
            Excluir
          </Button>
          <Button
            type="default"
            onClick={() => {
              setId(param.id);
              console.log(id);

              efetuarPagamentoa();
            }}
            style={{ margin: "3px", borderRadius: "500px", minWidth: "50px" }}
          >
            Selecionar
          </Button>
        </>
      ),
    },
  ];
  async function listClients() {
    const response = await api().get("/clients");
    setListClientsData(response.data);
    console.log({ response });
  }
  async function putClients() {
    const clientData = {
      nome: nome,
      idade: idade,
      peso: peso,
      altura: altura,
      nascimento: nascimento,
      ultimoPagamento: new Date(),
    };
    const response = await api().put(`/clients/${id}`, { clientData });
    toast.success(`${nome} editado`);
  }

  async function deleteClient() {
    const response = await api().delete(`/clients/${id}`);
    toast.sucess(`${nome} excluído`);
  }
  async function makePayment() {
    const pagamento = {
      valor: valor,
      ultimoPagamento: new Date(),
      id_client: id,
    };
    const response = await api().post("/pagamentos", { pagamento });
  }

  React.useEffect(() => {
    listClients();
  }, []);

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
            <Table dataSource={listClientsData} columns={columns} />
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
                <Input
                  placeholder="Nome completo: "
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="Idade: "
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="Peso: "
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="Altura: "
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="date-picker" label="Data de nascimento">
                <DatePicker
                  defaultValue={dayjs(data, dateFormatList)}
                  format={dateFormatList}
                />
              </Form.Item>
              <Form.Item name="date-picker" label="Último pagamento">
                <DatePicker
                  disabled
                  defaultValue={dayjs(data, dateFormatList)}
                  format={dateFormatList}
                  value={nascimento}
                  onChange={(e) => {
                    setNascimento(e.format(dateFormatList));
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
                  onClick={() => putClients()}
                  htmlType="submit"
                  type="primary"
                >
                  Editar cliente
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* modal excluir */}
          <Modal
            title="Deseja excluir o cliente?"
            open={excluirModalOpen}
            onOk={deleteClient}
            onCancel={handleCancel}
          ></Modal>

          {/* modal payment */}
          <Modal
            title="Efetuar pagamento"
            open={efetuarPagamento}
            onOk={handleOkEditar}
            onCancel={handleCancel}
          >
            <Input
              placeholder="Valor: "
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="number"
            />
            <Button
              onClick={() => makePayment()}
              style={{
                borderRadius: "500px",
                minWidth: "200px",
                width: "100%",
              }}
              htmlType="submit"
              type="primary"
            >
              Efetuar pagamento
            </Button>
          </Modal>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};
export default ListaClientes;

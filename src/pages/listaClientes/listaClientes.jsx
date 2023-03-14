import { Button, DatePicker, Form, Input, Modal, Table, Switch } from "antd";
import React, { useState } from "react";
import HeaderSecond from "../../components/HeaderSecond";
import "./style.scss";
import "../../style.css";
import api from "../../services/api";
import { formatToBRL } from "brazilian-values";
import dayjs from "dayjs";
import moment from "moment";

const dateFormatList = "DD/MM/YYYY";
const dateFormat = "YYYY/MM/DD";

const ListaClientes = () => {
  const [form] = Form.useForm();

  const [excluirModalOpen, setExcluirModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);
  const [efetuarPagamento, setEfetuarPagamento] = useState(false);
  const [listClientsData, setListClientsData] = useState([]);
  const [pesquisa, setPesquisa] = useState(null);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(null);
  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);
  const [nascimento, setNascimento] = useState(null);
  const [ultimoPagamento, setUltimoPagamento] = useState(null);
  const [id, setId] = useState(null);
  const [valor, setValor] = useState("");
  const handleOkEditar = () => {
    setEditarModalOpen(false);
    setEfetuarPagamento(false);
  };
  const handleCancel = () => {
    setExcluirModalOpen(false);
    setEditarModalOpen(false);
    setEfetuarPagamento(false);
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
              // setNome(param.nome);
              // setAltura(param.altura);
              //
              // setIdade(param.idade);
              //
              // setNascimento(param.nascimento);
              //
              // setPeso(param.peso);
              // setUltimoPagamento(param.ultimoPagamento);

              form.setFieldsValue({
                ...param,
                nascimento: moment(param.nascimento, dateFormat),
                ultimoPagamento: moment(param.ultimoPagamento, dateFormatList),
              })

              editarCliente();

              console.log({param})
            }}
            style={{ margin: "3px", borderRadius: "500px", minWidth: "50px" }}
          >
            Editar
          </Button>
          <Button
            type="default"
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
            type="primary"
            onClick={() => {
              setId(param.id);
              // console.log(id);
              efetuarPagamentoa();
            }}
            style={{ margin: "3px", borderRadius: "500px", minWidth: "50px" }}
          >
            Pagar
          </Button>
        </>
      ),
    },
  ];

  async function putClients() {
    const clientData = {
      nome: nome,
      idade: idade,
      peso: peso,
      altura: altura,
      nascimento: nascimento.format(dateFormatList),
      ultimoPagamento: new Date(),
    };
    const response = await api().put(`/clients/${id}`, { clientData });
    listClients();
    setEditarModalOpen(false);
  }

  async function deleteClient() {
    const response = await api().delete(`/clients/${id}`);
    listClients();
    setExcluirModalOpen(false);
  }
  async function makePayment() {
    let ultimoPagamento = new Date();
    let ultimoPagamentoString = ultimoPagamento.toISOString().slice(0, 10);
    const pagamento = {
      valor: valor,
      ultimoPagamento: ultimoPagamentoString,
      id_cliente: id,
    };
    const response = await api().post(`/pagamentos`, { pagamento });
    listClients();
    setEfetuarPagamento(false);
  }

  async function listClients() {
    const response = await api().get("/clients");
    setListClientsData(response.data);
    console.log({ response });
  }

  async function listVeacos() {
    const response = await api().get("/veacos");
    setListClientsData(response.data);
  }

  const onChangeVeacos = async (checked) => {
    checked ? listVeacos() : listClients();
  };
  async function filterClients() {
    console.log(`/clients/${pesquisa}`);
    const response = await api().get(`/clients/${pesquisa}`);
    setListClientsData(response.data);
  }

  React.useEffect(() => {
    listClients();
  }, []);



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
            onClick={() => filterClients()}
          >
            Pesquisar
          </Button>
          <div className="content">
            <label htmlFor="">Veacos: </label>
            <Switch defaultChecked={false} onChange={onChangeVeacos} />
          </div>
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
            footer={null}
          >
            <Form className="form" form={form} layout='vertical'>
              <Form.Item name="nome" label='Nome Completo'>
                <Input
                  autoFocus
                  placeholder="Nome completo: "
                />
              </Form.Item>
              <Form.Item name="idade" label='Idade'>
                <Input
                  type="number"
                  placeholder="Idade: "
                />
              </Form.Item>
              <Form.Item name="peso" label='Peso'>
                <Input
                  type="number"
                  placeholder="Peso: "
                />
              </Form.Item>
              <Form.Item name="altura" label='Altura'>
                <Input
                  type="number"
                  placeholder="Altura: "
                />
              </Form.Item>
              <Form.Item name="nascimento" label="Data de nascimento">
                <DatePicker
                  placeholder="Data de nascimento:"
                  // value={nascimento}
                  // onChange={(e) => {
                  //   setNascimento(e);
                  // }}
                  format={dateFormatList}
                />
              </Form.Item>

              <Form.Item name="ultimoPagamento" label="Último pagamento">
                <DatePicker
                  // placeholder={ultimoPagamento}
                  disabled
                  format={dateFormatList}
                  // value={ultimoPagamento}
                />
              </Form.Item>

              <Form.Item name="butao">
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
            footer={null}
          >
            <label htmlFor="">Valor:</label>
            <Input
              autoFocus
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
                marginBlock: "10px",
              }}
              htmlType="submit"
              type="primary"
            >
              Efetuar pagamento
            </Button>
          </Modal>
        </div>
      </section>
    </div>
  );
};
export default ListaClientes;

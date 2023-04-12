import { Button, DatePicker, Form, Input, Modal, Table, Switch } from "antd";
import React from "react";
import HeaderSecond from "../../components/HeaderSecond";
import api from "../../services/api";
import moment from "moment";
import locale from "antd/es/date-picker/locale/pt_BR";
import { dateFormatList } from "../../fungeng";

import "./style.scss";
import "../../style.css";

const ListaClientes = () => {
  const [form] = Form.useForm();

  const [excluirModalOpen, setExcluirModalOpen] = React.useState(false);
  const [editarModalOpen, setEditarModalOpen] = React.useState(false);
  const [efetuarPagamento, setEfetuarPagamento] = React.useState(false);
  const [listClientsData, setListClientsData] = React.useState([]);
  const [pesquisa, setPesquisa] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [valor, setValor] = React.useState("");

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
              form.setFieldsValue({
                ...param,
                nascimento: moment(param.nascimento, "DD/MM/YYYY"),
                ultimoPagamento: moment(param.ultimoPagamento, dateFormatList),
              });

              editarCliente();
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
    const formValues = form.getFieldsValue(true);

    const clientData = {
      ...formValues,
      nascimento: formValues["nascimento"].format(dateFormatList),
    };

    delete clientData.ultimoPagamento;

    await api().put(`/clients/${id}`, { clientData });
    listClients();
    setEditarModalOpen(false);
  }

  async function deleteClient() {
    await api().delete(`/clients/${id}`);
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
    await api().post(`/pagamentos`, { pagamento });
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
    console.log(`/clients/${pesquisa == null ? "" : pesquisa}`);
    const response = await api().get(
      `/clients/${pesquisa == null ? "" : pesquisa}`
    );
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
            <Form
              className="form"
              form={form}
              layout="vertical"
              onFinish={putClients}
            >
              <Form.Item
                name="nome"
                label="Nome Completo"
                rules={[
                  { required: true, message: "Preencha o Nome Completo" },
                ]}
              >
                <Input autoFocus placeholder="Nome completo: " />
              </Form.Item>
              <Form.Item
                name="idade"
                label="Idade"
                rules={[{ required: true, message: "Preencha a idade " }]}
              >
                <Input type="number" placeholder="Idade: " />
              </Form.Item>
              <Form.Item
                name="peso"
                label="Peso"
                rules={[{ required: true, message: "Preencha o peso" }]}
              >
                <Input type="number" placeholder="Peso: " />
              </Form.Item>
              <Form.Item
                name="altura"
                label="Altura"
                rules={[{ required: true, message: "Preencha a altura" }]}
              >
                <Input type="number" placeholder="Altura: " />
              </Form.Item>
              <Form.Item
                name="nascimento"
                label="Data de nascimento"
                rules={[{ required: true, message: "Preencha a altura" }]}
              >
                <DatePicker
                  placeholder="Data de nascimento:"
                  format={dateFormatList}
                  locale={locale}
                />
              </Form.Item>

              <Form.Item name="ultimoPagamento" label="Último pagamento">
                <DatePicker disabled format={dateFormatList} />
              </Form.Item>

              <Form.Item name="butao">
                <Button
                  style={{
                    borderRadius: "500px",
                    minWidth: "200px",
                    width: "100%",
                  }}
                  // onClick={() => putClients()}
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

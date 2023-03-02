import { Button, Modal, Table } from "antd";
import { useState } from 'react'
import HeaderSecond from "../../components/HeaderSecond";
import "./style.scss";
import '../../style.css'

const ListaClientes = () => {
    const [excluirModalOpen, setExcluirModalOpen] = useState(false);
    const [editarModalOpen, setEditarModalOpen] = useState(false);
    const handleOkExcluir = () => {
        setExcluirModalOpen(false);
    };
    const handleOkEditar = () => {
        setEditarModalOpen(false);
    };
    const handleCancel = () => {
        setExcluirModalOpen(false);
        setEditarModalOpen(false)
    };
    const excluirCliente = () => {
        setExcluirModalOpen(true)
    }
    const editarCliente = () => {
        setEditarModalOpen(true)
    }
    const dataSource = [
        {
            key: "1",
            id: "1",
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
                        onClick={() => editarCliente()}
                    >
                        Editar
                    </Button>
                    <Button
                        style={{ margin: "12px", borderRadius: "500px" }}
                        danger
                        type="primary"
                        onClick={() => excluirCliente()}
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
    return (
        <div>
            <HeaderSecond titulo="Listar clientes" />
            <section className="section-1">
                <div className="busca">
                    <input type="text" placeholder="Pesquise por nome ou código:" className="search" />
                    <Button style={{ margin: "12px", borderRadius: "500px" }} htmlType='submit' type='primary'>Pesquisar</Button>
                </div>
                <div className="section-2">
                    <div className="table-responsive">
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                    {/* modal editar */}
                    <Modal title="Deseja editar o cliente?" open={editarModalOpen} onOk={handleOkEditar} onCancel={handleCancel} ></Modal>
                    {/* modal excluir */}
                    <Modal title="Deseja apagar o cliente?" open={excluirModalOpen} onOk={handleOkExcluir} onCancel={handleCancel}></Modal>
                </div>
            </section>
        </div>
    );
};
export default ListaClientes;

import { Table } from "antd"
import React, { useState } from "react";
import HeaderSecond from "../../components/HeaderSecond"
import api from "../../services/api";
import '../../style.css'

const ListaPagamentos = () => {
    const [listPagamentosData, setListPagamentosData] = useState([]);

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
            title: "Valor",
            dataIndex: "valor",
            key: "valor"
        },
        {
            title: "Último pagamento",
            dataIndex: "ultimoPagamento",
            key: "ultimoPagamento"
        }
    ];
    async function listPayments() {
        const response2 = await api().get("/pagamentos");
        setListPagamentosData(response2.data);
    }
      
      React.useEffect(() => {
        listPayments();
      }, []);
    return (
        <>
            <HeaderSecond titulo="Listar pagamentos" />
            <div className="table-responsive" style={{ paddingLeft: '10vh', paddingRight: '10vh'}}>
            <Table dataSource={listPagamentosData} columns={columns} />
        </div>
        </>
    )
}
export default ListaPagamentos
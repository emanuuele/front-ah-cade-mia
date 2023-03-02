import { Table } from "antd"
import HeaderSecond from "../../components/HeaderSecond"
import '../../style.css'

const ListaPagamentos = () => {
    const dataSource = [
        {
            key: "1",
            codigo: "1",
            nome: "emanuele",
            valor: "18",
            ultimoPagamento: "02/03/2023"
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
    return (
        <>
            <HeaderSecond titulo="Listar pagamentos" />
            <div className="table-responsive" style={{ paddingLeft: '10px', paddingRight: '10px'}}>
            <Table dataSource={dataSource} columns={columns} />
        </div>
        </>
    )
}
export default ListaPagamentos
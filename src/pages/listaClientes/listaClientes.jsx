import HeaderSecond from "../../components/HeaderSecond";
import './style.scss'

const ListaClientes = () => {
    const clients = []
    return (
        <div>
            <HeaderSecond titulo="Listar clientes" />
            <section>
                <table>
                    <tr>
                        <th>Código</th><th>Nome</th><th>Idade</th><th>Peso</th><th>Altura</th><th>Nascimento</th><th>Último pagamento</th><th>Ação</th>
                    </tr>
                </table>
                <div className='content'>
                    {/* {clients?.map((item) => {
                        return (
                            <div>
                                <table>
                                    <tr>
                                        <td>aaaaa</td><td>{item.tipo == 'D' ? 'Deposito' : 'Saque'}</td><td>{item.data}</td>
                                    </tr>
                                </table>
                            </div>
                        )
                    })} */}
                    <table>
                        <tr>
                            <td>aa</td><td>bb</td>
                        </tr>
                    </table>

                </div>
            </section>
        </div>
    )
}
export default ListaClientes;
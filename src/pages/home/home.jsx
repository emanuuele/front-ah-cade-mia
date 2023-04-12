import { Button} from "antd";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.scss";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const Home = () => {
  const navigate = useNavigate();
  function linkTo(param) {
    navigate(`/${param}`);
  }
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
        
      </div>
      
    </>
  );
};
export default Home;

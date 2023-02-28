import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Cadastro from './pages/cadastro/cadastro'
import EfetuarPagamento from './pages/efetuarPagamento/efetuarPagamento'
import Home from './pages/listaClientes/listaClientes'
import ListaPagamentos from './pages/listaPagamentos/listaPagamentos'

export const router = createBrowserRouter([
    {
        path:"/cadastro",
        element: <Cadastro/>
    },
    {
        path:"/efetuarPagamento",
        element: <EfetuarPagamento/>
    },
    {
        path:"/home",
        element: <Home/>
    },
    {
        path:"/listaPagamentos",
        element: <ListaPagamentos/>
    }
])
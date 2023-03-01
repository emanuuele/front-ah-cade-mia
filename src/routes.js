import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Cadastro from './pages/cadastro/cadastro'
import EfetuarPagamento from './pages/efetuarPagamento/efetuarPagamento'
import Home from './pages/home/home'
import ListaPagamentos from './pages/listaPagamentos/listaPagamentos'
import ListaClientes from './pages/listaClientes/listaClientes'

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
        path:"/",
        element: <Home/>
    },
    {
        path:"/listarPagamentos",
        element: <ListaPagamentos/>
    },
    {
        path:"/listarClientes",
        element: <ListaClientes/>
    }
])
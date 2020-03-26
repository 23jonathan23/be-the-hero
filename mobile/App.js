//Biblioteca usada para formatar valor: ex como number em valor monetário
import 'intl'
//Importando o formado de converção Brasileiro
import 'intl/locale-data/jsonp/pt-BR'

//Importando o framework
import React from 'react';

//Importando o arquivo de Rotas
import Routes from './src/routes'

export default function App() {
  return (
    <Routes/>
  );
}

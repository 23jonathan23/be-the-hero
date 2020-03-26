import React from 'react';

import Routes from './routes'

import './global.css'

function App() {

  //Por padrão o estado só pode ser alterado pela function de atualização
  //essa função useState, retorna o valor no caso "counter" e a func de atualização
  return (
    <Routes/>
  )
}

export default App;

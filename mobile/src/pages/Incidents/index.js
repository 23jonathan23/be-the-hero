//Importação do Framework
import React, { useState, useEffect } from 'react'

//Responsavél por navegar o usuario para a Route destino
import { useNavigation } from '@react-navigation/native'

//Importação de componetes
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

//Importação da API
import api from '../../services/api'

//Importando pacote de icones
import { Feather } from '@expo/vector-icons'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents() {

  //Toda variavel/const que tiverem valores dinamicos
  //no react deve ser usado o UseState
  //que retorna o valor e a function de atualizar o valor
  const [incidents, setIncidents] = useState([])
  //Responsavel por armazenar o total de casos
  const [total, setTotal] = useState(0)

  //Responsavel por armazenar a pagina
  const [page, setPage] = useState(1)
  //Loading indentifica se uma requisição de carregar está sendo em processo
  const [loading, setLoading] = useState(false)
  
  const navigation = useNavigation()

  //Responsavel por levar o usuario para a pagina Detail
  //Route
  function navigateToDetail(incident) {
    //Como parametro podemos passar dados para a proxima Screen
    navigation.navigate('Detail', { incident })
  }

  //Reponsavel por carregar os incidents 
  async function loadIncidents() {
    //Verifica se loading é igual a true
    //Usado para evitar que requisições desnecessarias sejam realizadas
    //Que o usuario faça multiplas requisições seguidas dos mesmos dados 
    if(loading){
      return
    }

    //Verifica se todos os registro ja estão carregados
    //Usado para evitar que requisições desnecessarias sejam realizadas
    if(total > 0 && incidents.length === total){
      return
    }

    //Muda o estado do loading
    //avisando que uma requisição estará sendo realizada
    //e permanecerá com o valor true até que a requisição seja finalizada
    setLoading(true)

    //Fazendo a requisição do incidents
    //E passando como parametro a pagina atual
    const response = await api.get('incidents', {
      params: { page }
    })

    //Passando os dados recebidos da requisição para a constante
    //através da function de atualizar
    //Nesse caso agora estamos acresentando os dados da requisição
    //mantendo todos os dados que ja estão presentes na constante Incidents
    setIncidents([...incidents, ...response.data])

    //O total de registos retornado na requisição
    //o valor vem no Header da requisição
    setTotal(response.headers['x-total-count'])
    setPage(page + 1) //Resposavel por controlar as paginas
    setLoading(false) //Sinalizando que a requisição foi finalizada //liberando para que seja feito outras requisições
  }

  //Function desparada quando o componente/Screen é carregada
  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList //Componente para criar um lista no react native, com a rolagem de pagina
        data={incidents} //Dados recebidos do banco, usados nos componetes 
        style={styles.incidentList} //Style 
        keyExtractor={incident => String(incident.id)} //Chave de identificação unica de cada dado
        showsVerticalScrollIndicator={false} //Retira barra de rolagem vertical
        onEndReached={loadIncidents} //A function é disparada quando o usuario chega ao final da lista
        onEndReachedThreshold={0.2} //Define quando sera carregado novos dados //quando determinado percentual for atingido //nesse caso 0.2 é 20%
        //Componete que será renderizado com os dados recebidos do banco
        //JSX
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { //Intl formata o valor para monetario
              style: 'currency', 
              currency: 'BRL'
              }).format(incident.value)}</Text>

          <TouchableOpacity //Quando click sobre ele cria um efeito do opacidade
          style={styles.detailsButton}
          //Ação executada quando acontece o evento de click no "botão"
          onPress={() => navigateToDetail(incident)}>
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
    
  )
}
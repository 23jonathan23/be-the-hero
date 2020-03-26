//Importação do Framework
import React from 'react'

//Importação de componetes
import {Image, Text ,View ,TouchableOpacity, Linking} from 'react-native'

//useNavigation: Responsavel por navegar o usuario para a Route destino
//useRoute: responsavel por pegar dados da pagina atual, por ex: parametros passado pela Screen anterior
import { useNavigation, useRoute } from '@react-navigation/native'

//Biblioteca com ferramenta para enviar e-mails
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'

//Importando pacote de icones
import { Feather } from '@expo/vector-icons'

import logoImg from '../../assets/logo.png'

export default function Detail() {

  const navigation = useNavigation()
  const route = useRoute()

  //Recuperando os dados passados por parametro pela Screen anterior
  //Dados do incidente a ser exibido
  const incident = route.params.incident

  const message = `Olá ${incident.name} estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`

  //Resposavél por voltar a Screen anterior
  function navigateBack() {
    navigation.goBack()
  }

  //Resposavél por enviar e-mail
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`, //Assunto
      recipients: [incident.email], //Destinatario
      body: message//Mensagem corpo do e-mail
    })
  }

  //Resposavél por montar mensagem e abrir o whatsapp
  //No numero configurado
  function sendWhatsapp() {
    //parametro Send = numero do destinatario
    //parametro Text = conteudo da mensagem
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity //Quando click sobre ele cria um efeito do opacidade
        //Ação executada quando acontece o evento de click no "botão"
        onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
          <Text style={styles.incidentProperty, {margin: 0}}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { //Intl formata o valor para monetario
              style: 'currency', 
              currency: 'BRL'
              }).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity //Quando click sobre ele cria um efeito do opacidade
          style={styles.action} 
          //Ação executada quando acontece o evento de click no "botão"
          onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity //Quando click sobre ele cria um efeito do opacidade
          style={styles.action} 
          //Ação executada quando acontece o evento de click no "botão"
          onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
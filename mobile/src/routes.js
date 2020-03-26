import React from 'react'

//Biblioteca de navegação
import {NavigationContainer} from '@react-navigation/native'

//Biblioteca de navegação
import {createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

export default function Routes() {
  return (
    //Todos as rotas devem estar dentro do NavigationContainer e AppStack.Navigator
    //AppStack.screen são as paginas "telas", que devem ter um Name e o componente
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
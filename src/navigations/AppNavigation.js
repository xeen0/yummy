import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/Home/HomeScreen';
import RestaurantScreen from '../screens/Menu/MenuScreen';
import ViewIngredientsScreen from '../screens/ViewIngredients/ViewIngredientsScreen';
import StepScreen from '../screens/Steps/StepScreen';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name='Menu' component={RestaurantScreen}/>
    <Stack.Screen name='ViewIngredients' component={ViewIngredientsScreen} options={{title:'Ingredients'}} />
    <Stack.Screen name='Steps' component={StepScreen} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const DrawerStack = () =>(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Home'
      drawerStyle={{
        width: 0
      }}
    >
      <Drawer.Screen name='Home' component={MainNavigation} />


    </Drawer.Navigator>
)

export default function AppContainer() {
    return(
      <NavigationContainer>
        <DrawerStack/>
      </NavigationContainer>
    )
}
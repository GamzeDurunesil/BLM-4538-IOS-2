import { StyleSheet,Text,View } from "react-native";
import {NavigationContainer  } from "@react-navigation/native";
import {createNativeStackNavigator  } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { LoginScreen,SignupScreen,WelcomeScreen,  } from "./screens";
import HomePage from "./screens/HomePage";
import SearchPage from "./screens/SearchPage";
import WatchList from "./screens/WatchList";
import MovieDetails from "./screens/MovieDetails";
import PersonPage from "./screens/PersonPage";
import { black } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom tab bar içindeki navigasyon işlemleri için
const ScreenStack = () => {
  return(
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}} /> 
      <Stack.Screen name="WatchList" component={WatchList} options={{headerShown:false}} /> 
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{headerShown:false}} /> 
      <Stack.Screen name="Person" component={PersonPage} options={{headerShown:false}} /> 
      </Stack.Navigator>
  )
}


//Bottom tab var içindeki arama butonu için navigasyon
const SearchStack = () => {
  return(
      <Stack.Navigator>
      <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown:false}} /> 
      <Stack.Screen name="WatchList" component={WatchList} options={{headerShown:false}} /> 
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{headerShown:false}} /> 
      <Stack.Screen name="Person" component={PersonPage} options={{headerShown:false}} /> 
      </Stack.Navigator>
  )
}

//BOTTOM TAB BAR MAİNCONTAİNER
const homename = 'HomePage';
const searchname = 'SearchPage';
const watchname = 'WatchList';

const MainContainer = () => {
  return (
        <Tab.Navigator
        
        labeled={false}
        activeColor='#70C0E3'
        inactiveColor='#ffffff'
        barStyle={{backgroundColor:'#213D49', borderTopColor:black, borderTopWidth:2}}
        screenOptions={({route}) => ({

            tabBarIcon: ({focused,color,size}) => {
                let iconName;
                let rn = route.name;

                if(rn === homename){
                    iconName = focused ? 'home' : 'home-outline'

                }else if (rn === searchname) {
                    iconName = focused ? 'search' : 'search-outline'

                }else if (rn === watchname) {
                    iconName = focused ? 'list' : 'list-outline'
                }
                return <Ionicons name={iconName} size={26} color={color} />

            },
        })}
        >
            <Tab.Screen name={homename}component={ScreenStack} />
            <Tab.Screen name={searchname} component={SearchStack}/>
            <Tab.Screen name={watchname} component={WatchList}/>
        </Tab.Navigator>
      

  );

}








export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} /> 
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} /> 
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}} /> 
        <Stack.Screen name="Home" component={HomePage} options={{headerShown:false}} /> 
        <Stack.Screen name="MainContainer" component={MainContainer} options={{headerShown:false}} /> 
        <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown:false}} /> 
        <Stack.Screen name="WatchList" component={WatchList} options={{headerShown:false}} /> 
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{headerShown:false}} /> 
        <Stack.Screen name="Person" component={PersonPage} options={{headerShown:false}} /> 

      </Stack.Navigator>
      
      
    </NavigationContainer>




  );
}


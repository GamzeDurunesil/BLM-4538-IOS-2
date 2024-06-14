import { View, Text, Image, Button, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView  } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-linear-gradient";
import {  themecolors } from "../constant/colors";
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation= useNavigation();
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#213D49'}} >
        <View style={{flex:1}}>
          <View>
            <Image source={require("../assets/chocolatefact.jpg")}
            style={{
              height:203,
              width:137.5,
              position:'absolute',
              top:5,
              transform:[
                {translateX:60},
                {translateY:60},
                {rotate:"-10deg"}
              ]
            }}
            />

            <Image source={require("../assets/lotr.jpg")}
                   style={{
                    height:251.8125,
                    width:170,
                    position:'absolute',
                  
                    transform:[
                    {translateX:190},
                    {translateY:120},
                    {rotate:"20deg"}
                ]
              }}
            /> 

            <Image source={require("../assets/thelionking.jpg")}
                   style={{
                    height:328,
                    width:230,
                    position:'absolute',
                    
                    transform:[
                    {translateX:20},
                    {translateY:210},
                    {rotate:"-8deg"}
                ]
              }}
            />  
                             


          </View>
          <View style={{
            paddingHorizontal:210,
            position:'absolute',
            top:530,
            width:"200%"
            
          }}>
            <Text style={{
              fontSize:30,
              fontWeight:900,
              color:'#70C0E3'

            }}>

              Get Started
            </Text>
            
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
              <Text style={{
              fontSize:23,
              fontWeight:500,
              color:'#70C0E3'

            }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Signup')}>
              <Text style={{
              fontSize:23,
              fontWeight:500,
              color:'#70C0E3'

            }}>Sign-Up</Text>
            </TouchableOpacity>
          </View>
    
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    marginTop:550,
    width:"100%"
  
  },
  button: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom:16,
    borderRadius:20,
    borderWidth:2,
    borderColor:'#70C0E3'

  },
  
});
export default WelcomeScreen
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import {SafeAreaView  } from "react-native-safe-area-context";

import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const LoginScreen = () => {
  const navigation= useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user =>{
      if(user){
        navigation.replace("MainContainer")
      }

    })
    return unsubscribe
  }, [])

  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email,password)
    .then(userCredentials =>{
      const user = userCredentials.user ;
      console.log('Login with: ', user.email);
    })
    .catch(error => alert(error.message))

  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#213D49'}} >
        <View style={{flex:1}}>
          <View>
            <Image source={require("../assets/logo.jpg")}
            style={{
              height:230,
              width:220,
              position:'absolute',
              top:5,
              transform:[
                {translateX:80},
                {translateY:80},
              
              ]
            }}
            />                             
          </View>
          <View style={{justifyContent:'center', alignItems:'center'}}>
         
            <TextInput placeholder='E-mail' placeholderTextColor="#ffffff" style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}
            ></TextInput>
            <TextInput placeholder='Password' placeholderTextColor="#ffffff" style={styles.inputsecond}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
            ></TextInput>

          </View>
         
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}
            onPress={handleLogin} >
              <Text style={{
              fontSize:23,
              fontWeight:500,
              color:'#70C0E3'

            }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('Signup')}>
              <Text style={{
              fontSize:23,
              fontWeight:300,
              color:'#70C0E3',
              justifyContent:'center',
              paddingVertical:10,
              paddingHorizontal:'37%'

            }}>Sign-up</Text>
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
    marginTop:10,
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
  input: {
    color:'#ffffff',
    height: 40,
    width:'80%',
    paddingLeft:2,
    marginTop:400,
    justifyContent:'center',
    borderWidth: 1,
    padding: 10,
    borderTopColor:'#213D49',
    borderLeftColor:'#213D49',
    borderRightColor:'#213D49',
    borderBottomColor:'#ffffff',
    
  },
  inputsecond: {
    color:'#ffffff',
    height: 40,
    width:'80%',
    paddingLeft:2,
    justifyContent:'center',
    borderWidth: 1,
    padding: 10,
    borderTopColor:'#213D49',
    borderLeftColor:'#213D49',
    borderRightColor:'#213D49',
    borderBottomColor:'#ffffff',
    
  },
  
});

export default LoginScreen
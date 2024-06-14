import { View, Text,StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { image185 } from '../API/tmdbdatabase';

export default function Cast({cast, navigation}) {
    let personName = "Johnny Depp";
    let characterName = "Willy Wonka";
  return (
    <View>
      <Text style={styles.stuff}>Top Cast</Text>
      <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            cast && cast.map((person, index)=>{

                return(
                    <TouchableOpacity
                    key={index}
                    style={styles.castrow}
                    onPress={()=>navigation.push('Person',person)}>
                        <Image style={{height:120, width:90, borderRadius:10}} 
                        //source={require("../assets/jd.jpg")}
                        
                        source={{uri: image185(person?.profile_path)}}/>
                        <Text style={{color:"#ffffff",fontWeight:"200"}}>
                            {person?.character.length>10? person?.character.slice(0,10)+'...': person?.character
                            }

                        </Text>
                        <Text style={{color:"#ffffff",fontWeight:"200"}}>
                            {person?.name.length>10? person?.name.slice(0,10)+'...': person?.name
                            }

                        </Text>


                    </TouchableOpacity>

                )
            })


        }      

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

    stuff:{
      color:'#ffffff',
      fontWeight:"300",
      paddingLeft:10,
      marginHorizontal:4,
      marginBottom:5,
      fontSize:15,
      
    },
    castrow:{
        marginRight:4,
        alignItems:"center",
        padding:4
      

    }
  

    
    
  });
import { View, Text, Dimensions,StyleSheet, ScrollView, TouchableWithoutFeedback, Image} from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '../API/tmdbdatabase';

const {width, height} = Dimensions.get('window');


export default function SearchPage() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  let movieName = 'The Lion King';

  const handleSearch = value =>{
    if(value && value.length>2){
      searchMovies({
        query : value,
        include_adult : "false",
        language : "en-US",
        page : "1"
      }).then(data=>{
        console.log('got movies: ',data)
        if( data && data.results) setResults(data.results);
      })
    }
    else{
      setResults([])
    }
  }
  
  const handleTextDebounce = useCallback(debounce(handleSearch,400), []);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#213D49'}}>
      <View>
        
        <Searchbar
        onChangeText={handleTextDebounce}
        iconColor='#ffffff'
        placeholder='Search Movie'
        placeholderTextColor={'#ffffff'}
        style={styles.searchbox}
        color="#ffffff"
        
      />

      </View>

      {/* resultsss*/}

      {

        results.length>0? (

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            >
              <Text style={styles.desc}>Results ({results.length})  </Text>
              <View style={{justifyContent:"space-between", flexWrap:'wrap', flexDirection:"row"}} >

                {
                  results.map((item, index)=>{
                      return (
                        <TouchableWithoutFeedback
                        key = {index}
                        onPress={()=>navigation.push('MovieDetails',item)}>

                          <View className="space-y-2 mb-4" style={{padding:1,marginBottom:4, }} >
                          <Image 
                          //source = {require('../assets/thelionking.jpg')}
                          source={{uri: image185(item?.poster_path) }}
                          style={{width:width*.44, height:height*.3}}/>

                          <Text style={styles.nameline}> 
                          {
                            item?.title.length>22? item?.title.slice(0.14)+'...' : item?.title
                          }
                          </Text>
                          </View>
                          

                        </TouchableWithoutFeedback>
                      )

                  })

                }
              </View>

          </ScrollView>
          

        ):(

          <View style={{justifyContent:"space-between"}}>
            <Image style={{height:200, width:200, alignItems:"center",marginTop:"30%", marginLeft:"25%" }} source = {require("../assets/logo.jpg")}/>
            <Text style={{color:'#92929D',fontSize:20, paddingLeft:"37%", paddingTop:5}}>"Not Found"</Text>
          </View>
        )
      }
      
      



    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  searchbox:{
    marginTop:20,
    justifyContent:"space-between",
    borderRadius:25,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    borderWidth:2,
    borderColor:"#ffffff",
    backgroundColor:"#213D49",
    


  },
 desc:{
  color:"#92929D",
  padding:10,
  fontSize:15


 },
 nameline: {
  color:'#92929D',
  padding:5,


},

  
  
});

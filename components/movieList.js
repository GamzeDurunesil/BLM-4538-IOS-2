import { View, Text, StyleSheet,Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, } from '@react-navigation/native';
import { image185 } from '../API/tmdbdatabase';




var {width,height} = Dimensions.get('window');
const MovieList = ({title,data,hideSeeAll }) => {
  let movieName = "The Lion King";
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl" style={styles.text}>{title}</Text>
        {

          !hideSeeAll && (
            <TouchableOpacity>
          <Text className="text-lg" style={styles.seeall}>See all</Text>

        </TouchableOpacity>

          )
        }
        


      </View>
      {/*movie row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:7}}>
        {
          data.map((item, index)=>{
            return(
              <TouchableWithoutFeedback 
              key={index}
              onPress={()=> navigation.push('MovieDetails', item) }>
                <View style={{padding:10,}}>

                <Image 
                source={{uri: image185(item.poster_path)}}
                style={styles.photos}/>
                <Text style={styles.nameline}> {item.title.length>14? item.title.slice(0,14)+'...': item.title} </Text>
                
                </View>

              </TouchableWithoutFeedback>
            )
          })      }


      </ScrollView>
    </View>
  )
}







const styles = StyleSheet.create({
    text: {
        color:'#ffffff',
        fontSize:20,
        paddingTop:7,
        paddingLeft:7,
       
      
    },
    seeall:{
      color:'#ffc94a', paddingLeft:'40%', paddingTop:7, fontSize:15,
      marginLeft:170
    },
    nameline: {
      color:'#92929D',
      padding:5,


    },
    photos: {
      width: width*0.44,
      height: height*0.33,
    
    }
    
    
  });



export default MovieList
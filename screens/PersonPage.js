import { View, Text, Dimensions, ScrollView, TouchableOpacity,Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../API/tmdbdatabase';


var {width,height} = Dimensions.get('window');

export default function PersonPage() {
    const {params: item} = useRoute();
    let casteName = 'Johnny Depp';
    const navigation =useNavigation();
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState([]);

    useEffect(()=>{
        //console.log('person: ',item);

        getPersonDetails(item.id);
        getPersonMovies(item.id);


    },[item]);

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        //console.log('got person details: ', data);
        if(data) setPerson(data);
    }
    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        //console.log('got person movies: ', data);
        if(data && data.cast) setPersonMovies(data.cast);
    }

  return (
    <ScrollView 
        contentContainerStyle={{paddingBottom:20,}}
        className="flex-1"
        style={{backgroundColor:"#213D49"}}
    >
        {/* back button and movie poster*/}

        <View>
            <SafeAreaView >
                
            
                <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.backbutton} >
                    <Ionicons name='chevron-back' size={32} color="#70C0E3" />

                </TouchableOpacity>

                
            </SafeAreaView>

            <View style={{zIndex:-20}}>
                <Image 
                //source={require('../assets/jd.jpg')}
                source={{uri: image342(person?.profile_path)}}
                style={{width, height:height*.66}}
                />
                <LinearGradient colors={['transparent','#213D49', '#213D49']}
                style={{ width, height:height*.66, position:'absolute', paddingBottom:0}}
                start={{x:0.3, y:0}}
                end={{x:0.3, y:1.9}}
                >


                </LinearGradient>

            </View>

        </View>

        {/*movie details*/}
        <View style={{marginTop: -(height*0.09), alignItems:"center",paddingHorizontal:1}}>
            {/*title*/}
            <Text style={styles.text}> {person?.name} </Text>
        </View>
        <View style={styles.stuff}>
            {/*title*/}
            <Text style={styles.desc}> {person?.place_of_birth} </Text>
        </View>
        <View style={{height:120, width:width,marginTop:15}}>
            <View style={{height:90,position:"absolute",marginLeft:5}}>

                <Text style={styles.desc}> Gender</Text>
                <Text style={styles.stuff}> 
                {person?.gender==1? 'Female': 'Male'} </Text>

            </View>
            <View style={{height:90,position:"absolute",marginLeft:90}}>

                <Text style={styles.desc}> Birthday</Text>
                <Text style={styles.stuff}> {person?.birthday} </Text>

            </View>
            <View style={{height:90,position:"absolute",marginLeft:190}}>

                <Text style={styles.desc}> Known for</Text>
                <Text style={styles.stuff}> {person?.known_for_department} </Text>

            </View>
            <View style={{height:90,position:"absolute",marginLeft:280}}>

                <Text style={styles.desc}> Popularity</Text>
                <Text style={styles.stuff}> {person?.popularity?.toFixed(2)}% </Text>

            </View>
        </View>
        <View>
            {/* description */}
            <Text style={styles.desc}> {person?.biography} </Text>
        </View>

        {/* person movies */}

       <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}></MovieList>
        

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    backbutton:{
        backgroundColor:"#1c323b",
        borderRadius:50,
        width:45,
        height:45,
        paddingTop:4,
        paddingLeft:4,
        position:"absolute"
    },
    addbutton:{
        backgroundColor:"#1c323b",
        borderRadius:50,
        width:45,
        height:45,
        paddingTop:2,
        marginLeft:"90%",
        paddingLeft:3,
        position:"absolute",
        justifyContent:"space-between",
        alignItems:"center"
        
    },
    text: {
        color:'#ffffff',
        fontSize:26,
      
        textAlign:"center",
        fontWeight:"bold",
   

    },
    stuff:{
      color:'#ffffff',
      fontWeight:"300",
      padding:4,
      fontSize:15,
      textAlign:"center"
    },
   desc:{
    color:"#92929D",
    padding:10,
    fontSize:15,
    textAlign:"center"

   },

   box:{
    height: 120,
    width:width*.2,
    marginLeft:5,
    
   }

    
    
  });


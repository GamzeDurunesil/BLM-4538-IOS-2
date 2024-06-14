import { View, Text, ScrollView,Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import {fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500} from '../API/tmdbdatabase';
import { collection, addDoc} from "firebase/firestore";
import { db } from '../config/firebase';

var {width,height} = Dimensions.get('window');

const MovieDetails = () => {
    let movieName = 'Charlie and the Chocolate Factory';
    const { params: item} = useRoute();
    const navigation =useNavigation();

    const [isadded, toggleadded] =useState(false);
    const [cast, setCast] = useState([]);
    const [similarmovies, setSimilarMovies] = useState([]);
    const [movie, setMovie] = useState({});

    useEffect(() =>{
        // call the movie details

       console.log('itemid: ', item.id);

        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    },[item])

    const getMovieDetails = async id =>{
        const data = await fetchMovieDetails(id);
        //console.log('got movie details: ',data);
        if(data) setMovie(data);
    }
    const getMovieCredits = async id=>{

        const data = await fetchMovieCredits(id);
       // console.log('got credits: ',data);
       if (data && data.cast) setCast(data.cast);
    }
    const getSimilarMovies = async id=>{

        const data = await fetchSimilarMovies(id);
        //console.log('got similar movies: ',data);
       if (data && data.results) setSimilarMovies(data.results);
    }

    const addToWatchlist = async () => {
        try {
            await addDoc(collection(db, "watchlist"), {
              id: item.id,
              name: item.title,
              poster: item.poster_path,
         
            });
            console.log("Document written with ID: ", item.id);
            console.log("Document written with ID: ", item.title);

          } catch (e) {
            console.error("Error adding document: ", e);
          }
    };
    

    


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

                <TouchableOpacity onPress={()=> {
                    toggleadded(!isadded);
                    addToWatchlist();
                }} style={styles.addbutton}
                >
                    <Ionicons name={isadded? "checkmark":"add"} size={37} color="#70C0E3" />

                </TouchableOpacity>
                
            </SafeAreaView>

            <View style={{zIndex:-20}}>
                <Image 
                //source={require('../assets/chocolatefact.jpg')}
                source={{uri: image500(movie?.poster_path)}}
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
        <View style={{marginTop: -(height*0.09),alignItems:"center"}}>
            {/*title*/}
            <Text style={styles.text}> {movie?.title} </Text>

        
            {/* status, release, runtime*/}

            {
                movie?.id?(
                    <Text style={styles.stuff}> {movie?.status} | {movie?.release_date?.split('-')[0]} | {movie?.runtime} min </Text>

                ):null
            }
            {/* genres*/}
          
            <View style={{flexDirection:"row",justifyContent:"center"}}>
            {
                movie?.genres?.map((genre, index)=>{
                    let showLine = index+1 != movie.genres.length;
                    return(
                        <Text key={index} style={{color:"#ffffff", fontWeight:300,}}> {genre?.name} {showLine? "|":null} </Text>

                    )

                })
            }
            </View>
            
            {/* description */}
            <Text style={styles.desc}> {movie?.overview}</Text>
        </View>

        {/* cast */}
 
        {cast.length>0 && <Cast navigation={navigation} cast={cast} />}
        {similarmovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarmovies} />}


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
      textAlign:"center",
      padding:4,
      fontSize:15
    },
   desc:{
    color:"#92929D",
    padding:10,
    fontSize:15


   }

    
    
  });


export default MovieDetails
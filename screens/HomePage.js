import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieList from '../components/movieList';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../API/tmdbdatabase';

const HomePage = () => {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])

  const navigation= useNavigation();

  useEffect(()=>{

    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();

  },[])

  const getTrendingMovies = async ()=>{


    const data = await fetchTrendingMovies();
    console.log('got trending movies: ',data);
    if( data && data.results) setTrending(data.results);
    
  }
  const getUpcomingMovies = async ()=>{


    const data = await fetchUpcomingMovies();
    console.log('got upcoming movies: ',data);
    if( data && data.results) setUpcoming(data.results);
    
  }
  const getTopRatedMovies = async ()=>{


    const data = await fetchTopRatedMovies();
    console.log('got top-rated movies: ',data);
    if( data && data.results) setTopRated(data.results);
    
  }

  const handleLogout =() =>{

    signOut(auth)
    .then(()=>{
      navigation.replace("Welcome")
    })
    .catch(error => alert(error.message))
  }

  return(
    <SafeAreaView style={{flex:1, backgroundColor:'#213D49'}}>

    <Appbar style={{backgroundColor:'#1c323b'}} >
      <Text style={{color:'#ffffff', fontSize:26, alignItems:'center', justifyContent:"center",marginLeft:'36%'}}>Movie<Text style={{color:'#70C0E3'}}>S</Text>ea</Text>
      <Appbar.Action
        icon="logout"
        iconColor='#ffffff'
        style={{marginLeft:'20%'}}
        onPress={handleLogout}
      />
    </Appbar>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30, paddingHorizontal:7}} >
      { trending.length>0 && <MovieList title="Trending" data={trending} />}
      <MovieList title="Upcoming" data={upcoming} />
      <MovieList title="Top Rated" data={topRated} />

    </ScrollView>


    </SafeAreaView>


  )
};


export default HomePage
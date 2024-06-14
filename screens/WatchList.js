import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, View, Dimensions, TouchableOpacity, Image,TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Appbar } from 'react-native-paper';
import { apiKey } from '../constant';
import { image185, image500 } from '../API/tmdbdatabase';

var {width,height} = Dimensions.get('window');

const WatchList = ({}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Welcome")
      })
      .catch(error => alert(error.message))
  }

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "watchlist"));
      const dataList = [];
      querySnapshot.forEach((doc) => {
        dataList.push(doc.data());
      });
      setData(dataList);

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#213D49' }}>
      <Appbar style={{ backgroundColor: '#1c323b' }} >
        <Text style={{ color: '#ffffff', fontSize: 26, alignItems: 'center', justifyContent: "center", marginLeft: '36%' }}>Watch<Text style={{ color: '#70C0E3' }}>L</Text>ist</Text>
        <Appbar.Action
          icon="logout"
          iconColor='#ffffff'
          style={{ marginLeft: '20%' }}
          onPress={handleLogout}
        />
      </Appbar>

      {/* Verileri ekrana yazdırma */}
      <ScrollView  showsHorizontalScrollIndicator={true}
      contentContainerStyle={{paddingHorizontal:15}}>
        <View style={{justifyContent:"space-between", flexWrap:'wrap', flexDirection:"row",paddingTop:15}} >
        {data.map((item, index) => {
          return(
          <TouchableWithoutFeedback 
          key={index}
          onPress={()=> navigation.push('MovieDetails', item) }>
            <View style={{padding:1,marginBottom:4, }}>

            <Image 
            source={{uri: image185(item?.poster)}}
            //source={require("../assets/lotr.jpg")}
            style={styles.photos}/>

            <Text style={styles.nameline}> {item.name.length>14? item.name.slice(0,14)+'...': item.name} </Text>
            </View>

          </TouchableWithoutFeedback>
        )}  )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
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


export default WatchList;

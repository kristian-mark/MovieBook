/* screen/MovieScreen.js */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

import Loading from '../../components/Loading';
import ProfileThumb from '../../components/ProfileThumb';
import BackButton from '../../components/BackButton';
import InfoCard from '../../components/InfoCard';

const screen = Dimensions.get('window');
/**
 * importing fetchCredits function
 * we will use this function to fetch the list of crew and casts
 * and render them
 */
import { fetchCredits } from '../../TMDB.js/services';

// Firebase imports
import { getAuth, updateProfile } from 'firebase/auth';
import { FIREBASE_DB } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function MovieScreen({ navigation, route }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState('');
  const [isFavorite, setIsFavorite] = useState()
  const [id, setId] = useState(0)
  /**
   * below, we are getting the params that we passed
   * while navigating from HomeScreen.
   * we will use it to make an fetch request to
   * get crew and cast list based on movie.id.
  */
 const { movie } = route.params;
  const User = getAuth().currentUser;
 
 useEffect(() => {
   /**
    * set the loading state to true as we start fetching
    * credit details. while loading is true we will
    * see the <Loading/> component, just like
    * in HomeScreen
   */
  setLoading(true);
  /**
   * we will pass movie.id to fetchCredits()
   * which will return us the list of cast, crew, and director
  */
 fetchCredits(movie.id).then((data) => {
   setCredits(data.credits);
   setDirector(data.director);
   setId(data.credits.id)
   setLoading(false);



   
   //checking if film in array
   const fetchUserData = async () => {
    // Получаем ссылку на документ пользователя
    const docRef = doc(FIREBASE_DB, 'Users', User.uid)
  
    try {
      // Получаем данные о пользователе из Firestore
      const userDocs = await getDoc(docRef);
  
      if (userDocs.exists()) {
        // Если документ существует, извлекаем информацию о фильмах пользователя
        const userData = userDocs.data();
        // console.log('User data: ', userData)
        
        const films = userData.films;
        // console.log('Films: ', films)
  
        films.find((film) => {
          // console.log(film)           //appears, when you click on film
          film.id === movie
        });
        setIsFavorite(true)
      } else {
        console.log('Документ не найден');
        setIsFavorite(false)
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };
  fetchUserData()
    
        // if(movie in FIREBASE_DB.filmsArray){
          // setIsFavorite(true)
        // } else {
        //   setIsFavorite(false)
        // }
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={Styles.container}>
      <ImageBackground
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
        }}
        style={Styles.banner}
      >
        <View style={Styles.informa}>
          <BackButton navigation={navigation} />
          <InfoCard movie={movie} director={director} favorite={isFavorite}/>
        </View>
      </ImageBackground>
      <View style={Styles.credit}>
        <>
          <Text style={Styles.title}>CAST:</Text>
          {credits && (
            <FlatList
              style={Styles.list}
              keyExtractor={( item, index ) => String(index)}
              data={credits.cast}
              renderItem={({ item }) => <ProfileThumb key={id} item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
        <>
          <Text style={Styles.title}>CREW:</Text>
          {credits && (
            <FlatList
              style={Styles.list}
              keyExtractor={( item, index ) => String(index)}
              data={credits.crew}
              renderItem={({ item }) => <ProfileThumb key={id} item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
container: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // paddingTop: 20,
    backgroundColor: '#212121',
  },
  
  banner: {
    // position: 'relative',
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    height: 300,
},

informa:{
  flex:1
},

credit: {
    padding: 10,
  },

list: {
  left: 15,
},
  
title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});
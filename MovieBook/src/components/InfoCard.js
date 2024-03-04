import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

import ProgressBar from './ProgressBar';

import { doc, setDoc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB, storage } from '../../firebase';
import { getAuth, updateProfile } from 'firebase/auth';

import IonIcon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const screen = Dimensions.get('window');
const User = getAuth().currentUser;

/**
 * Our InfoCard component takes two props, "movie" and "director" 
 *from MovieScreen. "movie" prop is the object holding movie 
 *details like which we will use to show poster, title, overview, 
 *and vote_average.
 */
 const InfoCard = ({ movie, director }) => {
  const [favoriteColor, setFavoriteColor] = useState('white'); // Изначально цвет иконки "избранное" устанавливаем как белый

  useEffect(() => {
    async function checkFavoriteMovies() {
      try {
        const docRef = doc(FIREBASE_DB, 'Users', User.uid);
        const userDoc = await getDoc(docRef);
        const userData = userDoc.data();
        const films = userData.films || [];

        const filmExists = films.some(film => film.id === movie.id);

        if (filmExists) {
          setFavoriteColor('gold'); // Если фильм есть в списке, устанавливаем цвет иконки "избранное" как золотой
        } else {
          setFavoriteColor('white'); // Если фильма нет в списке, устанавливаем цвет иконки "избранное" как белый
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkFavoriteMovies();
  }, [movie]); // Запускаем проверку при изменении movie


  async function saveToFavorite() {
    try {
        const docRef = doc(FIREBASE_DB, 'Users', User.uid);
        const userDoc = await getDoc(docRef);
        const userData = userDoc.data();
        const films = userData.films || []; // Получаем текущий массив фильмов или создаем пустой массив, если его нет

        // Проверяем, есть ли уже фильм с таким же id в массиве films
        const filmExists = films.some(film => film.id === movie.id);

        if (!filmExists) {
            // Если фильма еще нет в массиве, добавляем его
            const updatedFilms = [...films, movie];
            await setDoc(docRef, {
                films: updatedFilms,
            }, { merge: true });
            console.log('Movie added to favorites');
            setFavoriteColor('gold');
            alert('Movie added to favorites');
        } else {
            // Если фильм уже есть в массиве, выводим сообщение об этом
            console.log('Movie already in favorites');
            alert('Movie already in favorites');
        }
    } catch (error) {
        console.error(error);
    }
}

  return (
    <View style={styles.infoCard}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.textInfo}>
        {/* Film name */}
        <View style={styles.container}>
          <Text style={styles.title}>
            {movie.original_title.length < 20
            ? movie.original_title
            : movie.original_title.substr(0, 20) + '...'}
            </Text>
          {/* Need to add logic to save films to favorites somehow */}
          <Fontisto name='favorite' size={20} color={favoriteColor} onPress={saveToFavorite}/>
        </View>

        {/* Film discription */}
        <Text style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>DESCRIPTION:</Text>
        <Text style={{ color: 'white', fontWeight: 400, fontSize: 12, bottom: 5, paddingHorizontal: 20 }}>
          {movie.overview.length < 100
            ? movie.overview
            : movie.overview.substr(0, 100) + '...'}
        </Text>
        <>
          <Text style={{ color: 'white', fontWeight: 500}}>DIRECTOR:</Text>
          <Text style={{ color: 'white', fontSize: 12, bottom: 8, left: 20, fontWeight: 400}}>{director?.name}</Text>
        </>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ProgressBar vote_average={movie.vote_average} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {movie.vote_average.toFixed(1)}
          </Text>
          <IonIcon name='star' size={15} color={'gold'} style={{left: 5}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    top: 40,
    paddingRight: 10,
    backgroundColor: 'rgba(21,21,21,0.8)',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  poster: {
    width: screen.width * 0.3,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export default InfoCard;
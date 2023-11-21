import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import ProgressBar from './ProgressBar';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const screen = Dimensions.get('window');

/**
 * Our InfoCard component takes two props, "movie" and "director" 
 *from MovieScreen. "movie" prop is the object holding movie 
 *details like which we will use to show poster, title, overview, 
 *and vote_average.
 */
const InfoCard = ({ movie, director }) => {
  return (
    <View style={styles.infoCard}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.textInfo}>
        <View style={styles.container}>
          <Text style={styles.title}>{movie.original_title}</Text>
          {/* Need to add logic to save films somehow */}
          <Fontisto name='favorite' size={20} color='gold' onPress={() => {console.log('saved')}}/>
        </View>
        <Text style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>DESCRIPTION:</Text>
        <Text style={{ color: 'white', fontWeight: 400, fontSize: 12, bottom: 5, paddingHorizontal: 20 }}>
          {movie.overview.length < 100
            ? movie.overview
            : movie.overview.substr(0, 100) + '...'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ProgressBar vote_average={movie.vote_average} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {movie.vote_average.toFixed(1)}
          </Text>
          <IonIcon name='star' size={15} color={'gold'} style={{left: 5}} />
        </View>
        <>
          <Text style={{ color: 'white', fontWeight: 500}}>DIRECTOR:</Text>
          <Text style={{ color: 'white', fontSize: 12, bottom: 8, left: 20, fontWeight: 400}}>{director?.name}</Text>
        </>
      </View>
    </View>
  );
};

export default InfoCard;

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
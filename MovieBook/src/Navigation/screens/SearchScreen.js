import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';

// Components
import Loading from '../../components/Loading'

// Expo
import axios from 'axios';
import Constants from 'expo-constants'

// Icons
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { fetchMovies } from '../../TMDB.js/services';

const screen = Dimensions.get('screen')

export default function SearchScreen({navigation}) {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchNow, setSearchNow] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchMovies(searchTerm, movies).then((data) => {
          setMovies(data);
          // set loading to false after movies are fetched.
          setLoading(false);
        });
      }, [searchNow]);

      return loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
            <View style={styles.inputCard}>
                <TextInput
                    style={styles.input}
                    placeholder={'search movies'}
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        setSearchNow(!searchNow);
                    }}>
                <EvilIcons
                    name={searchTerm ? 'search' : 'refresh'}
                    size={20}
                    color="black"
                    style={{ alignSelf: 'center', marginHorizontal: 20 }}
                    />
                </TouchableOpacity>
            </View>

            {/* The heighest big poster with title and discription */}
          <View>
            <Image
              source={{
                uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
              }}
              style={styles.banner}
            />
            <View style={styles.bannerInfoCard}>
              <Text style={styles.bannerTitle}>
                {movies[0]?.original_title.substr(0, 20)}
              </Text>
              <Text style={styles.bannerOverview}>
                {movies[0]?.overview.substr(0, 86) + '...'}
              </Text>
            </View>
          </View>
    
          <View>
    
             {/*rendering clickable poster thumbnails, when clicked, we will 
             be navigated to MovieScreen*/}
    
            <View style={styles.movieListCard}>
              <FlatList
                data={movies}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <Card style={styles.movieCard}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Movie', { movie: item });
                        }}>
                        <Image
                          source={{
                            uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                          }}
                          style={{ width: Constants.width, height: 200 }}
                        />
                      </TouchableOpacity>
                    </Card>
                  );
                }}
              />
            </View>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
container: {
    //   flex: 1,
    //   paddingTop: Constants.statusBarHeight,
    paddingBottom: 500,
    backgroundColor: 'rgba(33, 33, 33, 0.9)',
    },

banner: {
    width: Constants.width, height: 250
    },

bannerInfoCard: {
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 30,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(21,21,21,0.75)',
    },

bannerTitle: {
      color: '#de9a1d',
      fontSize: 20,
      letterSpacing: 1.2,
    },

bannerOverview: {
      color: '#e0d7d7',
    },

inputCard: {
      position: 'absolute',
      top: 40,
    //   margin: 20,
      marginHorizontal: 30,
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#5c5d5e',
      backgroundColor: 'rgba(256, 256, 256, 0.5)',
      alignItems: 'center',
      borderRadius: 5,
      zIndex: 100,
    },

input: {
      padding: 10,
      flex: 1,
      color: 'black',
    },

movieCard: {
      flex: 1,
      height: 200,
      margin: 5,
      alignSelf: 'center',
      overflow: 'hidden',
      borderWidth: 5,
    },
    
movieListCard: {
      top: 0,
    },
  });
  
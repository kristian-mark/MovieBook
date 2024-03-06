import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { FIREBASE_DB } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Loading from '../../components/Loading';

import Constants from 'expo-constants'

import { fetchFavoriteMovies } from '../../TMDB.js/services';

export default function FavoritesScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const User = getAuth().currentUser;

    // Функция для загрузки избранных фильмов из Firestore
    const loadFavoriteMovies = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchFavoriteMovies();
            setFavoriteMovies(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading favorite movies:', error);
        }
    }, []);

    // Обновляем список избранных фильмов при каждом изменении в Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(FIREBASE_DB, 'Users', User.email), () => {
            loadFavoriteMovies();
        });

        return () => unsubscribe();
    }, [loadFavoriteMovies, User.email]);

    return loading ? (
        <Loading />
    ) : (
        <View style={styles.container}>
            <FlatList
                data={favoriteMovies}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return(
                        <Card style={styles.movieCard} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Movie', { movie: item });
                                }}>
                                <Image
                                    source={{
                                        uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`
                                    }}
                                    style={{ width: Constants.width, height: 200 }}
                                />
                            </TouchableOpacity>
                        </Card>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1,
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
    },
    movieCard: {
        flex: 1,
        flex: 1,
        height: 200,
        margin: 5,
        alignSelf: 'center',
        overflow: 'hidden',
        borderWidth: 5,
      },
    moviePoster: {
        width: '100%', // Установите ширину в 100% от родительского контейнера
        height: '100%', // Установите высоту в 100% от родительского контейнера
    },
});
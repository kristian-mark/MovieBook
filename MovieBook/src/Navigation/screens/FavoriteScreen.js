import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import { FIREBASE_DB } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Loading from '../../components/Loading';

import { fetchFavoriteMovies } from '../../TMDB.js/services';

export default function FavoritesScreen({navigation}) {
    const [loading, setLoading] = useState(true);
    const [favoriteMovies, setFavoriteMovies] = useState([])
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
        const unsubscribe = onSnapshot(doc(FIREBASE_DB, 'Users', User.uid), () => {
            loadFavoriteMovies();
        });

        return () => unsubscribe();
    }, [loadFavoriteMovies, User.uid]);

    return loading ? (
        <Loading />
    ) : (
        <View style={Styles.container}>
            <View style={Styles.movieListCard}>
                <Text onPress={() => navigation.navigate('Favorites')} style={Styles.text}>Favorites Screen</Text>
                <FlatList
                    data={favoriteMovies}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={Styles.movieCard}>
                            <Text>{item.title}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
    },
});
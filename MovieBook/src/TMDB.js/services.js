import axios from 'axios';

/**
 * we are importing the base URL and API_KEY from our const.js 
 * */
import { URL, API_KEY } from './const';

import { getAuth } from 'firebase/auth';
import { FIREBASE_DB } from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
/**
 * fetchMovies takes one parameter, "search".
 * "search" is a search term which we will get from the TextInput 
 * component of HomeScreen.js screen, if the "search" is empty 
 * then we will fetch the list of movies from the movie/popular route of 
 * TMDB API which will give us a list of current popular movies,
 * and if the search term is not empty, we will fetch the data of
 * searched movie.
*/
const [filmy, setFilmy] =useState()
export const fetchMovies = async (search) => {
  console.log('fetch movies:', search);
  if (!search) {
    const response = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
    return [...response.data.results];
  } else {
    console.log('services.js/in else');
    const response = await axios.get(
      `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
    );
    return [...response.data.results];
  }
};

/**
 * we will call this function from our MovieScreen.js screen, 
 * fetchCredits take one parameter "id" which will be used for 
 * fetching cast and crew of the movie.
 * it returns the name of the director and the list of crew and 
 * cast
*/

export const fetchCredits = async (id) => {
  const response = await axios.get(
    `${URL}movie/${id}/credits?api_key=${API_KEY}`
  );
  // console.log(response.data.crew);
  /**
   * here we will search the name of director  
  */
 const director = response.data.crew.find(
   (dir) => dir.known_for_department === 'Directing'
   );
   const credits = response.data;
   const dirId = director.id;

   // Тут, вместо 'services.js/is film in favorites?' - надо добавить функцию, которая получает данные пользователя с firestore
   // Вот она:
   //checking if film in array
   //это сраный промис, надо переделать, чтобы он массив возвращал, а не промис
   const fetchUserData = async () => {
    const User = getAuth().currentUser;
    const docRef = doc(FIREBASE_DB, 'Users', User.uid);
  
    try {
      const userDocs = await getDoc(docRef);
  
      if (userDocs.exists()) {
        const userData = userDocs.data();
        // console.log('userdata ',userData.films)
        const films = userData.films || [];
        const filmIds = films.map((film) => film.id);
        console.log('servis: ',filmIds)
        return filmIds;
      } else {
        console.log('Документ не найден');
        return []; // Если документ не найден, возвращаем пустой массив
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      return []; // Если произошла ошибка, возвращаем пустой массив
    }
  }

  return { 
    credits: credits,
    director: director,
    id:dirId,
    favorite: '',

  };
};
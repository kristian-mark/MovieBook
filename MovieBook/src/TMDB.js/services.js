import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';

/**
 * we are importing the base URL and API_KEY from our const.js 
 * */
import { URL, API_KEY } from './const';
import { FIREBASE_DB } from '../../firebase';
import { getAuth, updateProfile } from 'firebase/auth';

/**
 * fetchMovies takes one parameter, "search".
 * "search" is a search term which we will get from the TextInput 
 * component of HomeScreen.js screen, if the "search" is empty 
 * then we will fetch the list of movies from the movie/popular route of 
 * TMDB API which will give us a list of current popular movies,
 * and if the search term is not empty, we will fetch the data of
 * searched movie.
*/
export const fetchFavoriteMovies = async () => {
  try {
    const User = getAuth().currentUser;
    console.log('Fetching favorite movies')
    const docRef = doc(FIREBASE_DB, 'Users', User.uid)
    const userDocs = await getDoc(docRef);
    const userData = userDocs.data();
    return userData.films || []; // возвращаем массив фильмов или пустой массив, если данных нет
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    return []; // возвращаем пустой массив в случае ошибки
  }
}


export const fetchMovies = async (search) => {
  console.log('fetch movies', search);
  if (!search) {
    const response = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
    return [...response.data.results];
  } else {
    console.log('in else');
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

  return { director: director, credits: credits, id: dirId };
};
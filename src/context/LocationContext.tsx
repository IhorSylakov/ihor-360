'use client';

import { createContext, useContext, useReducer } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CityName, CountryName, Photo, PlaceName } from '@/data/countryData';
import { useCallback } from 'react';

interface LocationState {
  countries: CountryName[];
  cities: CityName[];
  places: PlaceName[];
  photos: Photo[];
  photo: Photo | null;
  loading: boolean;
  error: string | null;
}

interface LocationAction {
  type: 'SET_COUNTRIES' | 'SET_CITIES' | 'SET_PLACES' | 'SET_PHOTOS' | 'GET_PHOTO' | 'SET_LOADING' | 'SET_ERROR';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialState: LocationState = {
  countries: [],
  cities: [],
  places: [],
  photos: [],
  photo: null,
  loading: false,
  error: null,
};

function locationReducer(state: LocationState, action: LocationAction): LocationState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_COUNTRIES':
      return { ...state, loading: false, countries: action.payload };
    case 'SET_CITIES':
      return { ...state, loading: false, cities: action.payload };
    case 'SET_PLACES':
      return { ...state, loading: false, places: action.payload };
    case 'SET_PHOTOS':
      return { ...state, loading: false, photos: action.payload };
    case 'GET_PHOTO':
      return { ...state, loading: false, photo: action.payload };
    default:
      return state;
  }
}

const LocationContext = createContext<{
  state: LocationState;
  dispatch: React.Dispatch<LocationAction>;
  fetchCountries: (userName?: string) => Promise<void>;
  fetchCitiesAndPlaces: (countryName: string, cityName?: string, userName?: string) => Promise<void>;
  fetchPhotos: (countryName: string, cityName: string, placeName: string, userName?: string) => Promise<void>;
  getPhoto: (photoId: string) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => undefined,
  fetchCountries: async () => {},
  fetchCitiesAndPlaces: async () => {},
  getPhoto: async () => {},
  fetchPhotos: async () => {},
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const fetchCountries = useCallback(async (userName?: string) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      let countryQuery;
      let countries: { id: string; }[];
      let userId: string | undefined;
      if (userName) {
        const userQuery = query(
          collection(db, 'users'),
          where('username', '==', userName)
        );
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          userId = userSnapshot.docs[0].id;
        } else {
          throw new Error(`"${userId}" не найден`);
        }
      }
      if (userId) {
        countryQuery = query(collection(db, 'countries'), where('authorId', '==', userId));
      } else {
        countryQuery = query(collection(db, 'countries'));
      }
      const snapshot = await getDocs(countryQuery);
      if (!snapshot.empty) {
        countries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        countries = [];
      }
      dispatch({ type: 'SET_COUNTRIES', payload: countries });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки стран' });
    }
  }, [dispatch]);

  const fetchCitiesAndPlaces = useCallback(
    async (countryName?: string, cityName?: string, userName?: string) => {
      dispatch({ type: 'SET_LOADING' });
  
      try {
        let countryId: string | undefined;
        let cityId: string | undefined;

        if (countryName) {
          const countryQuery = query(
            collection(db, 'countries'),
            where('name', '==', countryName),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const countrySnapshot = await getDocs(countryQuery);
          if (!countrySnapshot.empty) {
            countryId = countrySnapshot.docs[0].id;
          } else {
            throw new Error(`Страна с именем "${countryName}" не найдена`);
          }
        }

        if (countryId && cityName) {
          const cityQuery = query(
            collection(db, 'cities'),
            where('name', '==', cityName),
            where('countryId', '==', countryId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const citySnapshot = await getDocs(cityQuery);
          if (!citySnapshot.empty) {
            cityId = citySnapshot.docs[0].id;
          } else {
            throw new Error(`Город с именем "${cityName}" в стране "${countryName}" не найден`);
          }
        }

        if (countryId && !cityName) {
          const cityQuery = query(
            collection(db, 'cities'),
            where('countryId', '==', countryId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const citySnapshot = await getDocs(cityQuery);
          const cities = citySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: 'SET_CITIES', payload: cities });
        }

        if (cityId) {
          const placeQuery = query(
            collection(db, 'places'),
            where('cityId', '==', cityId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const placeSnapshot = await getDocs(placeQuery);
          const places = placeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: 'SET_PLACES', payload: places });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки данных' });
      }
    },
    [dispatch]
  );

  const fetchPhotos = useCallback(
    async (countryName: string, cityName: string, placeName: string, userName?: string) => {
      dispatch({ type: 'SET_LOADING' });

      try {
        let countryId: string | undefined;
        let cityId: string | undefined;
        let placeId: string | undefined;

        if (countryName) {
          const countryQuery = query(
            collection(db, 'countries'),
            where('name', '==', countryName),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const countrySnapshot = await getDocs(countryQuery);
          if (!countrySnapshot.empty) {
            countryId = countrySnapshot.docs[0].id;
          } else {
            throw new Error(`Страна с именем "${countryName}" не найдена`);
          }
        }

        if (countryId && cityName) {
          const cityQuery = query(
            collection(db, 'cities'),
            where('name', '==', cityName),
            where('countryId', '==', countryId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const citySnapshot = await getDocs(cityQuery);
          if (!citySnapshot.empty) {
            cityId = citySnapshot.docs[0].id;
          } else {
            throw new Error(`Город с именем "${cityName}" в стране "${countryName}" не найден`);
          }
        }

        if (countryId && cityId && placeName) {
          const placeQuery = query(
            collection(db, 'places'),
            where('name', '==', placeName),
            where('cityId', '==', cityId),
            where('countryId', '==', countryId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const placeSnapshot = await getDocs(placeQuery);
          if (!placeSnapshot.empty) {
            placeId = placeSnapshot.docs[0].id;
          } else {
            throw new Error(`Место с именем "${placeName}" в городе "${cityName}" в стране "${countryName}" не найден`);
          }
        }

        if (placeId) {
          const photoQuery = query(
            collection(db, 'photos'),
            where('placeId', '==', placeId),
            where('cityId', '==', cityId),
            where('countryId', '==', countryId),
            ...(userName ? [where('authorId', '==', userName)] : [])
          );
          const photoSnapshot = await getDocs(photoQuery);
          const photos = photoSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: 'SET_PHOTOS', payload: photos });
        }
      } catch (error) {
        console.log(error)
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки мест' });
      }
    },
    [dispatch]
  );

  const getPhoto = useCallback(
    async (photoId: string) => {
      dispatch({ type: 'SET_LOADING' });

      try {
        const photoRef = doc(db, 'photos', photoId);
        const photoSnapshot = await getDoc(photoRef);
        dispatch({ type: 'GET_PHOTO', payload: photoSnapshot.data() });
      } catch (error) {
        console.log(error)
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки мест' });
      }
    },
    [dispatch]
  );

  return (
    <LocationContext.Provider
      value={{
        state,
        dispatch,
        fetchCountries,
        fetchCitiesAndPlaces,
        fetchPhotos,
        getPhoto,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);

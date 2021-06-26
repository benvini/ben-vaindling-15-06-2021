import {Weather} from '../../types/types';
import {ADD_FAVORITE, REMOVE_FAVORITE, SET_TEMPERATURE_UNIT, CONVERT_FAVORITE_DEGREE} from './actionTypes';

export const addFavorite = (city: string, fiveDayWeather: Weather) => {
  return {
    type: ADD_FAVORITE,
    favorite: {
      city,
      weather: fiveDayWeather,
    },
  };
};

export const removeFavorite = (city: string) => {
  return {
    type: REMOVE_FAVORITE,
    city,
  };
};

export const setTemperatureUnit = (unit: string) => {
  return {
    type: SET_TEMPERATURE_UNIT,
    unit,
  };
};

export const convertFavoritesDegree = (newUnit: string) => {
  return {
    type: CONVERT_FAVORITE_DEGREE,
    unit: newUnit,
  };
};

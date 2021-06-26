import moment from 'moment';
import {Favorite} from '../../types/types';

export const fahrenheitToCelcius = (fahrenheit: number) => {
  return Math.round((fahrenheit - 32) * (5 / 9));
};

export const celciusToFahrenheit = (celsius: number) => {
  return Math.round((celsius * 9) / 5 + 32);
};

export const dateToDayShort = (date: Date) => {
  return moment(date).format('ddd');
};

export const convertFavoritesByDegreeUnit = (favorites: Favorite[], degreeUnit: string) => {
  const convertFunction = degreeUnit === 'Celcius' ? fahrenheitToCelcius : celciusToFahrenheit;
  const convertedFavorites = favorites.map((favorite) => {
    return {
      ...favorite,
      weather: {
        ...favorite.weather,
        temperature: convertFunction(favorite.weather.temperature),
      },
    };
  });
  return convertedFavorites;
};

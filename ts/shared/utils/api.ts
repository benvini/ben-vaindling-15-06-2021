import axios from 'axios';

import {fahrenheitToCelcius, dateToDayShort} from './utils';
import {FORECAST_API_5_DAYS, CITIES_AUTOCOMPLETE, GET_GEOLOCATION, GET_CITY_INFO} from '../../../bin/config';
import {API_KEY} from '@env';

export const get5DayForecast = async (locationKey: string) => {
  const response = await axios.get(`${FORECAST_API_5_DAYS}/${locationKey}?apikey=${API_KEY}`);
  return response.data;
};

export const getAutoCompleteLocation = async (text: string) => {
  const response = await axios.get(`${CITIES_AUTOCOMPLETE}?apikey=${API_KEY}&q=${text}`);
  return response.data;
};

export const getGeoLocation = async (text: string) => {
  const response = await axios.get(`${GET_GEOLOCATION}?apikey=${API_KEY}&q=${text}`);
  return response.data;
};

export const getCityInfo = async (city: string) => {
  const geoLocationRes = await getGeoLocation(city);
  const {Key: locationKey} = geoLocationRes[0];
  const response = await axios.get(`${GET_CITY_INFO}/${locationKey}?apikey=${API_KEY}`);
  return response.data;
};

export const fetchWeatherByText = async (text: string) => {
  const geoLocationRes = await getGeoLocation(text);
  const {Key: locationKey, LocalizedName: cityName} = geoLocationRes[0];
  const weatherRes = await get5DayForecast(locationKey);

  const {
    DailyForecasts,
    Headline: {Text},
  } = weatherRes;

  const weather = DailyForecasts.map((forecastItem: any) => {
    const {
      Date,
      Temperature: {
        Maximum: {Value: tempInFahrenheit},
      },
      Day: {IconPhrase},
    } = forecastItem;
    return {
      temperature: fahrenheitToCelcius(tempInFahrenheit),
      dayShort: dateToDayShort(Date),
      description: IconPhrase,
    };
  });
  return {
    weather,
    headline: Text,
    cityName,
  };
};

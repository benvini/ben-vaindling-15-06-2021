import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {Screen, Typography} from '../../../shared/components';
import {fetchWeatherByText, getAutoCompleteLocation} from '../../../shared/utils/api';
import Spinner from '../../../shared/components/Spinner';
import {INITIAL_CITY} from '../../../constants/constants';
import {Weather, WeatherState} from '../../../types/types';
import FiveDayWeather from './FiveDayWeather';
import {celciusToFahrenheit, fahrenheitToCelcius} from '../../../shared/utils/utils';
import {setTemperatureUnit, convertFavoritesDegree} from '../../../store/actions/weather';

const Input = styled.TextInput`
  padding: 8px;
  border: 1px solid #ccc;
  height: 40px;
  width: 200px;
  margin: 10px;
  color: ${({theme: {palette}}) => palette.textColor};
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-self: center;
`;

const City = styled(Typography)`
  justify-content: center;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? '#ccc' : ({theme: {palette}}) => palette.primary)};
  align-items: center;
  height: 40px;
  margin: 8px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

const FlatList = styled.FlatList`
  color: ${({theme: {palette}}) => palette.textColor};
  background-color: ${({theme: {palette}}) => palette.secondary};
  border-radius: 4px;
  margin-top: 12px;
`;

const ListContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const HomeScreen = () => {
  const {t} = useTranslation('homeScreen');
  const [inputText, setInputText] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fiveDayWeather, setFiveDayWeather] = useState<Weather[]>();
  const [weatherTitle, setWeatherTitle] = useState('');
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const temperatureUnit = useSelector((state: WeatherState) => state.degreeUnit);

  const updateWeatherData = useCallback((fetchedWeather) => {
    const {weather, headline, cityName} = fetchedWeather;
    setFiveDayWeather(weather);
    setWeatherTitle(headline);
    setCity(cityName);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const fetchedWeather = await fetchWeatherByText(INITIAL_CITY);
        updateWeatherData(fetchedWeather);
      } catch (e) {
        setError(true);
      }
    })();
  }, [updateWeatherData]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputText !== '') {
        try {
          const response = await getAutoCompleteLocation(inputText);
          const fetchedCities = response.map((res: any) => res.AdministrativeArea.LocalizedName);
          setCities(fetchedCities);
        } catch (e) {
          setError(true);
        }
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [inputText]);

  const onInputChange = useCallback(async (text: string) => {
    setInputText(text);
  }, []);

  const onCityPress = useCallback((pressedCity: string) => {
    setInputText(pressedCity);
    setCities([]);
    setFiveDayWeather([]);
  }, []);

  const onFavoritesClicked = useCallback(() => {
    navigation.navigate('Favorites');
  }, [navigation]);

  const onChangeTemperature = useCallback(() => {
    const newTemperatureUnit = temperatureUnit === t('celcius') ? t('fahrenheit') : t('celcius');
    dispatch(setTemperatureUnit(newTemperatureUnit));
    dispatch(convertFavoritesDegree(newTemperatureUnit));
    const newWeatherByTempUnit = fiveDayWeather?.map(
      (weather): Weather => {
        return {
          ...weather,
          temperature: newTemperatureUnit === t('celcius') ? fahrenheitToCelcius(weather.temperature) : celciusToFahrenheit(weather.temperature),
        };
      },
    );
    setFiveDayWeather(newWeatherByTempUnit);
  }, [temperatureUnit, fiveDayWeather, t, dispatch]);

  const onSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedWeather = await fetchWeatherByText(inputText);
      updateWeatherData(fetchedWeather);
    } catch (e) {
      setError(true);
    }
  }, [inputText, updateWeatherData]);

  if (error) {
    return <Typography>{t('unableFetchWeather')}</Typography>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Screen>
      <HeaderContainer>
        <Button disabled>
          <Typography>{t('home')}</Typography>
        </Button>
        <Button onPress={onFavoritesClicked}>
          <Typography>{t('favorites')}</Typography>
        </Button>
      </HeaderContainer>
      <SearchContainer>
        <Input onChangeText={onInputChange} value={inputText} />
        <Button onPress={onSearch}>
          <Typography>{t('search')}</Typography>
        </Button>
      </SearchContainer>
      {cities && cities.length ? (
        <ListContainer>
          <FlatList
            data={cities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: {item: string}) => <City onPress={() => onCityPress(item)}>{item}</City>}
            contentContainerStyle={{padding: 12, alignItems: 'center'}}
          />
        </ListContainer>
      ) : null}
      {!cities.length && fiveDayWeather && fiveDayWeather.length ? (
        <>
          <Button onPress={onChangeTemperature}>
            <Typography>{temperatureUnit === t('celcius') ? t('convertToFahrenheit') : t('convertToCelcius')}</Typography>
          </Button>
          <FiveDayWeather weather={fiveDayWeather} title={weatherTitle} city={city} />
        </>
      ) : null}
    </Screen>
  );
};

export default HomeScreen;

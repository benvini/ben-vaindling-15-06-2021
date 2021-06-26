import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {addFavorite, removeFavorite} from '../../../store/actions/weather';
import {Favorite, Weather, WeatherState} from '../../../types/types';
import {CELCIUS_SYMBOL, FAHRENHEIT_SYMBOL} from '../../../constants/constants';
import WeatherDay from './WeatherDay';
import {Typography} from '../../../shared/components';

type Props = {
  weather: Weather[];
  title: string;
  city: string;
};

const StyledScreen = styled.View`
  padding: 8px;
  border: 2px solid ${({theme: {palette}}) => palette.primary};
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
  height: 80%;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const StyledTitle = styled(Typography)`
  font-weight: bold;
  font-size: 30px;
  color: ${({theme: {palette}}) => palette.primary};
  align-self: center;
`;

const FavoritesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DegreeContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? '#ccc' : ({theme: {palette}}) => palette.primary)};
  height: 40px;
  margin-left: 12px;
`;

const WeatherDayContainer = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const CityTemperatureContainer = styled.View`
  flex-direction: column;
  padding: 8px;
`;

const FiveDayWeather = ({weather, title, city}: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {t} = useTranslation('fiveDayWeather');
  const dispatch = useDispatch();
  const favorites = useSelector((state: WeatherState) => state.favorites);
  const temperatureUnit = useSelector((state: WeatherState) => state.degreeUnit);
  const degreeSymbol = temperatureUnit === t('celcius') ? CELCIUS_SYMBOL : FAHRENHEIT_SYMBOL;

  const isCityFavorite = useCallback(() => {
    let isCityFavorited = false;
    favorites.forEach((favorite: Favorite) => {
      if (favorite.city === city) {
        isCityFavorited = true;
      }
    });
    return isCityFavorited;
  }, [favorites, city]);

  const onToggleFavorite = useCallback(() => {
    if (!isCityFavorite()) {
      dispatch(addFavorite(city, weather[0]));
      setIsFavorite(true);
    } else {
      dispatch(removeFavorite(city));
      setIsFavorite(false);
    }
  }, [dispatch, city, weather, isCityFavorite]);

  return (
    <StyledScreen>
      <HeaderContainer>
        <CityTemperatureContainer>
          <Typography>{city}</Typography>
          <DegreeContainer>
            <Typography>{weather[0].temperature}</Typography>
            <Typography>{degreeSymbol}</Typography>
          </DegreeContainer>
        </CityTemperatureContainer>
        <FavoritesContainer>
          <Icon onLongPress={onToggleFavorite} name={isFavorite ? 'heart' : 'hearto'} size={30} color="#900" />
          <Button onPress={onToggleFavorite}>
            <Typography>{isFavorite ? t('removeFromFavorites') : t('addToFavorites')}</Typography>
          </Button>
        </FavoritesContainer>
      </HeaderContainer>
      <StyledTitle>{title}</StyledTitle>
      {weather && weather.length ? (
        <WeatherDayContainer>
          {weather.map((weatherItem, index) => (
            <WeatherDay key={index} day={weatherItem.dayShort} temperature={weatherItem.temperature} />
          ))}
        </WeatherDayContainer>
      ) : null}
    </StyledScreen>
  );
};

export default FiveDayWeather;

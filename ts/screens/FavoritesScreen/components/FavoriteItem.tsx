import React from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {Favorite, WeatherState} from '../../../types/types';
import {CELCIUS_SYMBOL, FAHRENHEIT_SYMBOL} from '../../../constants/constants';
import {Typography} from '../../../shared/components';

type Props = {
  favorite: Favorite;
};

const FavoriteContainer = styled.View`
  border: 2px solid ${({theme: {palette}}) => palette.primary};
  padding: 4px;
  margin-bottom: 8px;
  align-items: center;
`;

const DegreeContainer = styled.View`
  flex-direction: row;
`;

const FavoriteItem = ({favorite}: Props) => {
  const {t} = useTranslation('favoriteItem');
  const temperatureUnit = useSelector((state: WeatherState) => state.degreeUnit);
  const degreeSymbol = temperatureUnit === t('celcius') ? CELCIUS_SYMBOL : FAHRENHEIT_SYMBOL;
  const {
    city,
    weather: {temperature, description},
  } = favorite;
  return (
    <FavoriteContainer>
      <Typography>{city}</Typography>
      <DegreeContainer>
        <Typography>{temperature}</Typography>
        <Typography>{degreeSymbol}</Typography>
      </DegreeContainer>
      <Typography>{description}</Typography>
    </FavoriteContainer>
  );
};

export default FavoriteItem;

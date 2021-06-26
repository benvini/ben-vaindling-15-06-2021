import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import {WeatherState} from '../../../types/types';
import {CELCIUS_SYMBOL, FAHRENHEIT_SYMBOL} from '../../../constants/constants';
import {Typography} from '../../../shared/components';

type Props = {
  day: string;
  temperature: number;
};

const WeatherContainer = styled.View`
  border: 2px solid ${({theme: {palette}}) => palette.primary};
  padding: 4px;
  width: 70px;
  margin-right: 8px;
  align-items: center;
`;

const WeatherDay = ({day, temperature}: Props) => {
  const {t} = useTranslation('weatherDay');
  const temperatureUnit = useSelector((state: WeatherState) => state.degreeUnit);
  const degreeSymbol = temperatureUnit === t('celcius') ? CELCIUS_SYMBOL : FAHRENHEIT_SYMBOL;
  return (
    <WeatherContainer>
      <Typography>{day}</Typography>
      <Typography>{temperature}</Typography>
      <Typography>{degreeSymbol}</Typography>
    </WeatherContainer>
  );
};

export default WeatherDay;

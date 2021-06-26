import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import WeatherNavigator from './WeatherNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <WeatherNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

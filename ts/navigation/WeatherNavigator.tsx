import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/components/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen/components/FavoritesScreen';
import {ROUTES} from './routes';

const defaultNavOptions: StackNavigationOptions = {
  headerShown: false,
};

const opacityTransition: object = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 600,
      },
    },
  },
  cardStyleInterpolator: ({current}: {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const WeatherStackNavigator = createStackNavigator();

const WeatherNavigator = () => {
  const {home, favorites} = ROUTES;
  return (
    <WeatherStackNavigator.Navigator screenOptions={{...defaultNavOptions, ...opacityTransition}}>
      <WeatherStackNavigator.Screen name={home} component={HomeScreen} />
      <WeatherStackNavigator.Screen name={favorites} component={FavoritesScreen} />
    </WeatherStackNavigator.Navigator>
  );
};

export default WeatherNavigator;

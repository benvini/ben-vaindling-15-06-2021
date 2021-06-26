import {AnyAction} from 'redux';
import {WeatherState} from '../../types/types';
import * as actionTypes from '../actions/actionTypes';
import {INITIAL_DEGREE_UNIT} from '../../constants/constants';
import {convertFavoritesByDegreeUnit} from '../../shared/utils/utils';

const initialState = {
  favorites: [],
  degreeUnit: INITIAL_DEGREE_UNIT,
};

const WeatherReducer = (state: WeatherState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE:
      return addFavorite(state, action);
    case actionTypes.REMOVE_FAVORITE:
      return removeFavorite(state, action);
    case actionTypes.SET_TEMPERATURE_UNIT:
      return setTemperatureUnit(state, action);
    case actionTypes.CONVERT_FAVORITE_DEGREE:
      return convertFavoritesDegree(state, action);
    default:
      return state;
  }
};

const addFavorite = (state: WeatherState, action: AnyAction) => {
  return {
    ...state,
    favorites: [...state.favorites, action.favorite],
  };
};

const removeFavorite = (state: WeatherState, action: AnyAction) => {
  return {
    ...state,
    favorites: state.favorites.filter((favorite) => favorite.city !== action.city),
  };
};

const setTemperatureUnit = (state: WeatherState, action: AnyAction) => {
  return {
    ...state,
    degreeUnit: action.unit,
  };
};

const convertFavoritesDegree = (state: WeatherState, action: AnyAction) => {
  return {
    ...state,
    favorites: convertFavoritesByDegreeUnit(state.favorites, action.unit),
  };
};

export default WeatherReducer;

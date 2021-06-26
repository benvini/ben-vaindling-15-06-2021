import {AnyAction} from 'redux';

export type RoutesType = {
  home: string;
  favorites: string;
};

export type Favorite = {
  city: string;
  weather: Weather;
};

export type Weather = {
  temperature: number;
  dayShort: string;
  description: string;
};

export type WeatherState = {
  favorites: Favorite[];
  degreeUnit: string;
};

export interface AddFavoriteAction extends AnyAction {
  type: string;
  favorite: Favorite;
}

export interface RemoveFavoriteAction extends AnyAction {
  type: string;
  city: string;
}

export type FocusedCityType = {
  name: string;
  country: string;
  region: string;
  timezone: string;
};

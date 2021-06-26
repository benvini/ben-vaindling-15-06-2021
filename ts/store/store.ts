import {createStore} from 'redux';
import weatherReducer from './reducers/weather';

const store = createStore(weatherReducer);

export default store;

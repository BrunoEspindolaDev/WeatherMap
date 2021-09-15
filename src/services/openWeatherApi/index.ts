// Packages
import axios from 'axios';

// Types
import {GetByCoords} from './types';

// Instance
const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/'
});

// Routes
const routes = {
  getByCoords: (coords: [number, number]) => {
    return instance
      .get<GetByCoords.Response>(
        `weather?lat=${coords[0]}&lon=${coords[1]}&appid=${process.env.REACT_APP_ACCESS_TOKEN_OPEN_WEATHER}&lang=pt_br&units=metric`
      )
      .then(({data}) => ({...data}))
      .catch(() => {
        throw new Error(
          'Comportamento Inesperado. Tente novamente mais tarde!'
        );
      });
  }
};

export default routes;

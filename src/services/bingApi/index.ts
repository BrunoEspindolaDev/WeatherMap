// Packages
import axios from 'axios';

// Types
import {GetByQuery} from './types';

// Instance
const instance = axios.create({
  baseURL: 'http://dev.virtualearth.net/REST/v1/Locations/'
});

// Routes
const routes = {
  getByQuery: (query: string) => {
    return instance
      .get<GetByQuery.Response>(
        `locationQuery=${query}?includeNeighborhood=1&maxResults=5&&key=${process.env.REACT_APP_ACCESS_TOKEN_BING}`
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

// Packages
import {useAsync} from 'hooks';
import {LatLngTuple} from 'leaflet';
import React, {createContext, ReactElement, useState, useEffect} from 'react';

// Services
import openWeatherApi from 'services/openWeatherApi';

// Context
export const Context = createContext({} as ContextProps);

// Provider
export const Provider = ({children}: ProviderProps) => {
  const [{coords, weatherDetail}, setState] = useState<ContextState>({
    coords: null,
    weatherDetail: {
      isLoading: false
    }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setState(prev => ({...prev, coords: [latitude, longitude]}));
      }
    );
  }, []);

  const {run: getByCoordsRun} = useAsync({
    asyncFunction: openWeatherApi.getByCoords,
    onPending: () => {
      setState(prev => ({...prev, weatherDetail: {isLoading: true}}));
    },
    onSuccess: ({weather, main, wind, dt, name}) => {
      setState(prev => ({
        ...prev,
        weatherDetail: {
          isLoading: false,
          data: {
            dt,
            name,
            ...weather[0],
            ...main,
            ...wind
          }
        }
      }));
    }
  });

  useEffect(() => {
    if (coords) getByCoordsRun(coords);
  }, [coords, getByCoordsRun]);

  const setCoords: SetCoords = coords => {
    setState(prev => ({...prev, coords}));
  };

  return (
    <Context.Provider value={{coords, weatherDetail, setCoords}}>
      {children}
    </Context.Provider>
  );
};

// Types
type ContextProps = {
  setCoords: SetCoords;
} & ContextState;

type ContextState = {
  coords: LatLngTuple | null;
  weatherDetail: WeatherDetail;
};

type ProviderProps = {
  children: ReactElement | ReactElement[];
};

type WeatherDetail = {
  isLoading: boolean;
  data?: {
    id: number;
    main: string;
    description: string;
    icon: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    dt: number;
    name: string;
    speed: number;
    deg: number;
  };
};

type SetCoords = (coords: LatLngTuple) => void;

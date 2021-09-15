// Packages
import React, {FC} from 'react';

// UI
import {Box} from '@chakra-ui/react';
import {MapContainer, TileLayer} from 'react-leaflet';
import AddMarkerToClick from 'components/AddMarketToClick';
import WeatherDetailCard from 'components/WeatherDetailCard';

// Component
const Home: FC = () => {
  return (
    <Box position="relative" h="100vh" overflow="hidden">
      <WeatherDetailCard />
      <MapContainer
        zoom={3}
        zoomControl={false}
        center={{lat: 51.505, lng: -0.09}}
        scrollWheelZoom
        style={{
          height: '100%'
        }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
        />
        <AddMarkerToClick />
      </MapContainer>
    </Box>
  );
};

export default Home;

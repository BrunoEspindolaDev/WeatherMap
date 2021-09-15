// Packages
import React, {FC, useEffect} from 'react';

// Assets
import pinIcon from 'assets/icons/pin.svg';

// UI
import {useMapEvents, Marker} from 'react-leaflet';
import L, {icon} from 'leaflet';

// Hooks
import {useAppContext} from 'hooks';

// Component
const AddMarkerToClick: FC = ({children}) => {
  const {coords, setCoords} = useAppContext();

  const map = useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng;
      setCoords([lat, lng]);
      map.flyTo(e.latlng, 10);
    }
  });

  useEffect(() => {
    if (coords) map.flyTo(coords, 10);
  }, [coords, map]);

  const customIcon = icon({
    iconUrl: pinIcon,
    iconSize: new L.Point(60, 75)
  });

  return coords ? (
    <Marker
      position={[coords[0], coords[1]]}
      interactive={false}
      icon={customIcon}>
      {children}
    </Marker>
  ) : null;
};

export default AddMarkerToClick;

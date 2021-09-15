import {LatLngTuple} from 'leaflet';

export type Resource = {
  __type: string;
  bbox: number[];
  name: string;
  point: {
    type: string;
    coordinates: number[];
  };
  address: {
    adminDistrict: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
  };
  confidence: string;
  entityType: string;
  geocodePoints: [
    {
      type: string;
      coordinates: LatLngTuple;
      calculationMethod: string;
      usageTypes: string[];
    }
  ];
  matchCodes: string[];
};

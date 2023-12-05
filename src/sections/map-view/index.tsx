'use client';

import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MAPBOX_TOKEN } from 'src/config-global';

const MapDraggableMarkers = dynamic(() => import('./draggable-markers'));
const MapCluster = dynamic(() => import('./clusters'));

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken: MAPBOX_TOKEN,
  minZoom: 1,
  scrollZoom: false,
};

// const StyledMapContainer = styled('div')(({ theme }) => ({
//   zIndex: 0,
//   height: 344,
//   overflow: 'hidden',
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
//     display: 'none',
//   },
// }));

type latlang = {
  latitude: number;
  longitude: number;
};
type MapViewProps = {
  geoData: latlang;
  onDataChange: (data) => {};
  onChange: (data) => {};
  lap: string;
};

export default function MapView({ lap, geoData, onDataChange }: MapViewProps) {
  const [dataFromChild, setDataFromChild] = useState('');
  const StyledMapContainer = styled('div')(({ theme }) => ({
    zIndex: 0,
    height: lap === 'communities' ? 344 : 500,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
      display: 'none',
    },
  }));
  const handleChildData = (data: any) => {
    setDataFromChild(data);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    lap === 'communities' && onDataChange(dataFromChild);
  }, [dataFromChild, lap, onDataChange]);

  return (
    <StyledMapContainer>
      {/* @ts-ignore */}
      {lap === 'communities' ? (
        <MapDraggableMarkers
          {...baseSettings}
          mapStyle={THEMES.light}
          latitude={geoData.latitude}
          longitude={geoData.longitude}
          onDataUpdate={handleChildData}
        />
      ) : (
        <MapCluster {...baseSettings} geoData={geoData} mapStyle={THEMES.light} />
      )}
    </StyledMapContainer>
  );
}

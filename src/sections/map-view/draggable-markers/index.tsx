import { memo, useCallback, useState } from 'react';
import Map, { LngLat, MarkerDragEvent } from 'react-map-gl';
// components
import { MapBoxProps, MapControl, MapMarker } from 'src/components/map';
//
import ControlPanel from './control-panel';

// ----------------------------------------------------------------------

function MapDraggableMarkers({ geoData, ...other }: MapBoxProps) {
  const [marker, setMarker] = useState({
    latitude: geoData?.latitude,
    longitude: geoData?.longitude,
  });

  console.log(marker);

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <>
      <Map
        initialViewState={{ latitude: marker?.latitude, longitude: marker?.longitude, zoom: 3.5 }}
        {...other}
      >
        <MapControl />

        <MapMarker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        />
      </Map>

      <ControlPanel events={events} longitude={marker.longitude} latitude={marker.latitude} />
    </>
  );
}

export default memo(MapDraggableMarkers);

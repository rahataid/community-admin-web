import { memo, useCallback, useEffect, useState } from 'react';
import Map, { LngLat, MarkerDragEvent } from 'react-map-gl';
// components
import { MapBoxProps, MapControl, MapMarker } from 'src/components/map';
//

// ----------------------------------------------------------------------

function MapDraggableMarkers({ latitude, longitude, onDataUpdate, ...other }: MapBoxProps) {
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 3.5,
  });

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback(
    (event: MarkerDragEvent) => {
      logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

      setMarker({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
      onDataUpdate(marker);
    },
    [marker, onDataUpdate]
  );

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      setMarker({
        latitude,
        longitude,
      });
      setViewState((prev) => ({ ...prev, latitude, longitude }));
    }
  }, [latitude, longitude]);

  return (
    <>
      {/* {viewState.latitude && viewState.longitude && (
        <>
          
          <ControlPanel events={events} longitude={marker.longitude} latitude={marker.latitude} />
        </>
      )} */}
      <Map {...viewState} onMove={(evt) => setViewState(evt.viewState)} {...other}>
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
    </>
  );
}

export default memo(MapDraggableMarkers);

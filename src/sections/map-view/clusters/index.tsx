import { memo, useRef } from 'react';
import Map, {
  GeoJSONSource,
  Layer,
  LngLatLike,
  MapLayerMouseEvent,
  MapRef,
  Source,
} from 'react-map-gl';
// components
import { MapBoxProps, MapData } from 'src/components/map';
//
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from './layers';

// ----------------------------------------------------------------------

function MapClusters({ geoData, ...other }: { other: MapBoxProps; geoData: MapData }) {
  const mapRef = useRef<MapRef>(null);
  // const data = {
  //   type: 'FeatureCollection',
  //   crs: {
  //     type: 'name',
  //     properties: {
  //       name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
  //     },
  //   },
  //   features: geoData,
  // };

  const mapDatas = geoData?.map((item) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item?.latitude, item?.longitude],
    },
    properties: {
      // cluster: true,
      id: item.country,
    },
  }));
  const data = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    features: mapDatas,
  };

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (error) {
        return;
      }

      if (feature?.geometry.type === 'Point') {
        mapRef.current?.easeTo({
          center: feature?.geometry.coordinates as LngLatLike | undefined,
          zoom: Number.isNaN(zoom) ? 3 : zoom,
          duration: 500,
        });
      }
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 27.700769,
        longitude: 85.30014,
        zoom: 3,
      }}
      interactiveLayerIds={[clusterLayer.id || '']}
      onClick={onClick}
      ref={mapRef}
      {...other}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={data}
        cluster
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
}

export default memo(MapClusters);

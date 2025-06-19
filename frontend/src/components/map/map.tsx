import React, { JSX } from 'react';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import './map.scss';

export function MapComponent(): JSX.Element {
  return (
    <div className="map-container">
      <APIProvider apiKey='AIzaSyAfWauiQFLxEaa_ouGd8c0C0_BZ5wT6pNI'>
        <Map
          // <-- Tell the Map to stretch to its parent’s size
          style={{ width: '100%', height: '100%' }}
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        />
      </APIProvider>
    </div>
  );
}

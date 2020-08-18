import React, { useState, useRef } from 'react';
import { Styles } from '../styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const { Common } = Styles;

const StoreLocation = ({ markers, setMarkers }) => {
  const [ center, setCenter ] = useState({ lat: -20.119613, lng: 57.503579 });

  const [ index, setIndex ] = useState(0);

  const outer = [
    [-19.871844, 57.183472],
    [-20.669327, 57.953233],
  ]

  const updatePosition = (key) => {
    const marker = refmarker.current
    if (marker != null) {
      newMarker(markers[key], marker.leafletElement.getLatLng());
    }
  }

  const refmarker = useRef();

  const newMarker = (key, value) => {
    let obj = Object.assign({}, markers);
    if (value !== undefined) {
      obj[key] = value;
    } else {
      obj[key] = { lat: -20.119613, lng: 57.503579 };
    }
    setMarkers(obj);
  }

  return (
    <div style={{ position: 'relative' }}>
      <Common.Buttons.Default
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, margin: 10 }}
        onClick={() => (newMarker(index), setIndex(index + 1))}
      >
        <Common.Icons.Default style={{ paddingRight: 5 }} icon={faPlus} /> Add Store
      </Common.Buttons.Default>
      <Map
        center={[ center.lat, center.lng ]}
        zoom={10}
        maxBounds={outer}
        minZoom={10}
        boxZoom={true}
        tap={true}
        style={{ height: '60vh', width: '100%', margin: '10px 0px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />


        {
          [...Object.keys(markers)].map((marker, index) => (
            <Marker
              key={index}
              draggable={true}
              onDragend={(mark) => {
                newMarker(parseInt(marker), {...mark.target._latlng});
              }}
              position={[ markers[marker].lat, markers[marker].lng ]}
              ref={refmarker}
            />
          ))
        }

      </Map>
    </div>
  )
}

export default StoreLocation;

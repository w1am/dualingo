import React, { useState, useRef } from 'react';
import { Styles } from '../styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withRouter, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Tags } from '../tags';
import { loadImage } from '../utils/imageFormatter';
import ScrollToTopRoute from '../ScrollToTopRoute';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const { Common } = Styles;

const StoreLocation = ({ match: { params } }) => {
  const [ center, setCenter ] = useState({ lat: -20.119613, lng: 57.503579 });

  const [ index, setIndex ] = useState(0);

  const [ markers, setMarkers ] = useState({});

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

  const openLink = (lat, lng) => {
    return `http://www.google.com/maps/place/${lat},${lng}`
  }

  const newMarker = (key, value) => {
    let obj = Object.assign({}, markers);
    if (value !== undefined) {
      obj[key] = value;
    } else {
      obj[key] = { lat: -20.119613, lng: 57.503579 };
    }
    setMarkers(obj);
  }

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollToTopRoute />
      <Map
        center={[ center.lat, center.lng ]}
        zoom={10}
        maxBounds={outer}
        minZoom={10}
        boxZoom={true}
        tap={true}
        style={{height: '80vh', width: '100%', margin: '10px 0px', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

        <Query query={Tags.Merchant.Queries.getLocations} variables={{ storeName: params.name }}>
          {
            ({ loading, data }) => {
              if (loading) return null;
              const { getLocations: locations } = data;
              if (locations == null) {
                return <Redirect to='/' />
              } else {
                return locations.map((location, index) => (
                  <Marker
                    ref={initMarker}
                    key={index}
                    draggable={false}
                    position={[ location.lat, location.lng ]}
                    // ref={refmarker}
                  >
                    <Popup>
                      <p style={{ textAlign: 'center', margin: 0 }}>
                        <Common.Assets.LogoSM src={loadImage(params.name, 'logo', true, false)} /> <br />
                      </p>
                      Open in <Common.Links.Normal
                        onClick={() => window.open(openLink(location.lat, location.lng), '_blank')}
                        to='#'
                      >Google maps</Common.Links.Normal>
                    </Popup>
                  </Marker>
                ))
              } 
            }
          }
        </Query>

      </Map>
    </div>
  )
}

export default withRouter(StoreLocation);

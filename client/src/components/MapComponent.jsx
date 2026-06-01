import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';

// Fix for default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MapComponent = ({ artisans }) => {
  const defaultPosition = [6.5244, 3.3792]; // Lagos

  return (
    <MapWrapper>
      <MapContainer 
        center={defaultPosition} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {artisans.map((artisan) => (
          artisan.artisanProfile.location?.coordinates && (
            <Marker 
              key={artisan._id} 
              position={[
                artisan.artisanProfile.location.coordinates.lat, 
                artisan.artisanProfile.location.coordinates.lng
              ]}
            >
              <Popup>
                <strong>{artisan.artisanProfile.businessName || artisan.name}</strong><br />
                {artisan.artisanProfile.skills.join(', ')}<br />
                <a href={`/artisan/${artisan._id}`}>View Profile</a>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default MapComponent;

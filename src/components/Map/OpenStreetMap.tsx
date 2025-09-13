
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OpenStreetMap = () => {
  return (
    <MapContainer center ={[13.0827, 80.2707]} zoom={8} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[13.0827, 80.2707]}>
        <Popup>
          Chennai<br />This marker is on OpenStreetMap.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenStreetMap;

#cd d:/dumpbox/ocean-eyes-connect-main; npm run dev
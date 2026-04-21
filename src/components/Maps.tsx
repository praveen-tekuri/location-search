import { useEffect, useRef } from "react";
import type { Place } from "../api/place"
import { Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface MapProps{
    place: Place | null;
}

const Maps = ({place}: MapProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  
  useEffect(() => {
    if(mapRef.current && place){
        mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  },[place]);

  return (
    <MapContainer
        ref={mapRef}
        center={[40.7, -74]}
        zoom={10}
        scrollWheelZoom
        className="h-full">
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={15}
                maxNativeZoom={18}
                crossOrigin={true}
            />
        {place && <Marker position={[place.latitude, place.longitude]}/>}
    </MapContainer>
  )
}

export default Maps
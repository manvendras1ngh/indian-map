import { useRef, useMemo } from 'react'
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import indiaGeoJSONMap from "./assets/india_states.json";

const MapControl = ({mapRef}) => {
  const map = useMap();
  useMemo(() => {
    if(map) {
      mapRef.current = map;
      console.log(map);
    }
  }, [map]);

  return null;
}

function App() {
  const mapRef = useRef(null);

  let geoMapStyle = {
    color: "black", weight: "0.3", fillColor: "beige",fillOpacity: 0.4,
  }

  const handleEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties.ST_NM);

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: "skyblue",
          fillOpacity: 1
        })
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: "beige",
          fillOpacity: 0.4,
        })
      },
      click: () => {
        const map = mapRef.current;
        if (map) {
          const bounds = layer.getBounds();
          if (map.getZoom() <= 5) {
            map.flyToBounds(bounds, { maxZoom: 8 });
          } else {
            map.flyTo([22, 82], 5); 
          }
        }
      }
    })
  }

  return (
    <MapContainer 
    style = {{height: "100vh", width: "100%"}}
    center = {[22, 82]}
    zoom = {5}
    scrollWheelZoom = {false}
    doubleClickZoom = {false}
    >
      <MapControl 
        mapRef = {mapRef}
      />
      <GeoJSON 
        data = {indiaGeoJSONMap} 
        onEachFeature = {handleEachFeature} 
        style = {geoMapStyle}
      />
    </MapContainer>
  )
}

export default App;
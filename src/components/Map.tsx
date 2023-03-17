import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLat } from "mapbox-gl";
import layer from "./Layer";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGh5bG8iLCJhIjoiY2prOGFva3kwMGx0dzNrcDhqaTltYnZtdCJ9.vu5SSoS2fJ40PvY2ZSbe_g";

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current, // container ID
        style: "mapbox://styles/thylo/clf2bfcom002f01q6ihzws2yj", // style URL
        zoom: 18,
        center: [148.9819, -35.3981],
        pitch: 60,
        antialias: true,
      });
      setMap(map);


      map.on('style.load', () => {
        map.addLayer(layer, 'road-label');
      });
    }
  }, []);

  const onButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        if (map) {
          const pos = new LngLat(e.coords.longitude, e.coords.latitude);
          map.flyTo({ center: pos });
          if (markerRef.current) {
            new mapboxgl.Marker(markerRef.current).setLngLat(pos).addTo(map);
          }
        }
      },
      (e) => console.info(e)
    );
  };

  return (
    <div className="map">
      <div ref={mapRef} className={"map__map"}></div>
      <div className={"map__controls"}>
        <button onClick={onButtonClick}>Where is Etienne ?</button>
      </div>
      <div className="marker" ref={markerRef}>
        <img
          src="https://static-assets.tesla.com/configurator/compositor?&bkba_opt=2&view=STUD_3QTR&size=1400&model=m3&options=$APBS,$DV2W,$IBB1,$PPSW,$PRM30,$SC04,$MDL3,$W40B,$MT322,$CPF0,$RSF1,$CW03&crop=1400,850,300,130&"
          alt=""
        />
        Etienne is here
      </div>
    </div>
  );
};

export default Map;

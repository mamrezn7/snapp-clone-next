"use client";
import * as L from "leaflet/dist/leaflet";
import { useEffect, useState } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing() {
  const map = useMap();
  console.log(map);

  const [wayPoints, setWayPoints] = useState([
    L.latLng(57.74, 11.9),
    L.latLng(57.74, 11.94),
  ]);

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: wayPoints,
      show: true,
      autoRoute: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

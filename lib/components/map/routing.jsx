"use client";
import * as L from "leaflet/dist/leaflet";
import { useEffect, useState } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  //   iconUrl: "/images/marker.png",
  //   shadowUrl: "../../../public/marker.png",
});

export default function Routing({ wayPoints, bounds }) {
  const map = useMap();
  console.log(wayPoints);

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: wayPoints,
      show: true,
      autoRoute: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, wayPoints]);

  return null;
}

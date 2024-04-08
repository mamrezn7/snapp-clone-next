"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import Routing from "./routing";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PrimaryButton from "../shared/button";

function Map() {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [wayPoints, setWayPoints] = useState([]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("dragend", onMove);
    return () => {
      map.off("dragend", onMove);
    };
  }, [map, onMove]);

  return (
    <React.Fragment>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing wayPoints={wayPoints} />
      <div className="absolute bottom-0 w-full p-8" style={{ zIndex: "1000" }}>
        <PrimaryButton onClick={() => setWayPoints([...wayPoints, position])}>
          ثبت درخواست
        </PrimaryButton>
      </div>
    </React.Fragment>
  );
}

export default Map;

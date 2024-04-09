"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import Routing from "./routing";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { PrimaryButton, CustomButton } from "../shared/button";

function Map() {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [wayPoints, setWayPoints] = useState([]);
  const [bounds, setBounds] = useState([]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("dragend", onMove);
    return () => {
      map.off("dragend", onMove);
    };
  }, [map, onMove]);

  const selectStartPoint = () => {
    setWayPoints([...wayPoints, position]);
  };
  const selectEndPoint = () => {
    setWayPoints([...wayPoints, position]);
  };

  const submitRequest = () => {
    // map.flyToBounds(updatedArray);
    // map.flyToBounds(wayPoints);
    map.zoomOut();
  };

  useEffect(() => {
    wayPoints.length === 2 ? map.flyToBounds(wayPoints) : null;
  }, [wayPoints]);

  return (
    <React.Fragment>
      {wayPoints.length < 2 && (
        <img
          src="/images/marker-icon.png"
          alt=""
          className="absolute left-1/2 top-1/2"
          style={{ zIndex: "1000" }}
        />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing wayPoints={wayPoints} bounds={bounds} />
      <div
        className="absolute bottom-0 w-full grid bg-white rounded-xl p-6"
        style={{ zIndex: "1000" }}
      >
        {wayPoints.length === 0 ? (
          <React.Fragment>
            <PrimaryButton onClick={() => selectStartPoint(position)}>
              انتخاب مبدا
            </PrimaryButton>
          </React.Fragment>
        ) : wayPoints.length === 1 ? (
          <PrimaryButton onClick={() => selectEndPoint(position)}>
            انتخاب مقصد
          </PrimaryButton>
        ) : (
          <div className="">
            <span className="text-black">هزینه</span>
            <div className="flex flex-row gap-3">
              <CustomButton
                className="bg-rose-600 py-3 px-6 hover:bg-red-700"
                onClick={() => setWayPoints([])}
              >
                لغو
              </CustomButton>
              <PrimaryButton onClick={() => submitRequest()}>
                درخواست خودرو
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Map;

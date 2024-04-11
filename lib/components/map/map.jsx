"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import Routing from "./routing";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { PrimaryButton, CustomButton } from "../shared/button";
import CountUp from "react-countup";

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
    map.flyToBounds(wayPoints, { padding: [0, 250] });
  };
  const cancelRequest = () => {
    setWayPoints([]);
    map.zoomOut();
  };

  useEffect(() => {
    wayPoints.length === 2 ? submitRequest() : null;
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
            <div className="text-stone-600 font-bold text-base flex flex-row justify-between py-4 align-middle">
              <div>
                <span>درخواست</span>
                <br />
                <span className="text-stone-400">خودرو کلاسیک</span>
              </div>
              <span>
                <CountUp
                  end={10000}
                  duration={3}
                  className="text-3xl text-stone-800"
                />{" "}
                تومان
              </span>
            </div>
            <div className="flex flex-row gap-3">
              <CustomButton
                className="bg-rose-600 py-3 px-6 hover:bg-red-700"
                onClick={() => cancelRequest()}
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

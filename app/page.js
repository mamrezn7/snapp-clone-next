"use client";
import Button from "@/lib/components/shared/button";
import Image from "next/image";
import "../node_modules/leaflet/dist/leaflet";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from "@/lib/components/map/routing";
// import dynamic from "next/dynamic";

// const Routing = dynamic(() => import("@/lib/components/map/routing"), {
//   loading: () => <p>loading...</p>,
//   ssr: false,
// });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MapContainer
        center={[57.74, 11.94]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing />
      </MapContainer>
      <div className="absolute bottom-0 w-full p-16 z-50">
        <Button>ثبت درخواست</Button>
      </div>
    </main>
  );
}

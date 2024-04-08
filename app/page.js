"use client";
import Image from "next/image";
import "../node_modules/leaflet/dist/leaflet";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from "@/lib/components/map/routing";
import PrimaryButton from "@/lib/components/shared/button";
import Map from "@/lib/components/map/map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MapContainer
        center={[57.74, 11.94]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen z-10"
      >
        <Map />
      </MapContainer>
    </main>
  );
}

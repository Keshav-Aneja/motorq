"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ImSpinner2 } from "react-icons/im";
import { useGlobalContext } from "@/context/GlobalContext";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Map({ location }: { location: any }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { locationDrivers } = useGlobalContext();
  const [markerPosition, setMarkerPositions] = useState<[number, number][]>([]);
  useEffect(() => {
    if (typeof window !== undefined) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (locationDrivers && locationDrivers.length > 0) {
      const positions: [number, number][] = locationDrivers.map((driver) => {
        return [
          Number(JSON.parse(driver.location).lat),
          Number(JSON.parse(driver.location).lng),
        ];
      });
      setMarkerPositions(positions);
    }
  }, []);
  useEffect(() => {
    if (location) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);
  // useEffect(() => {
  //   if (typeof window !== undefined && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setPosition([position.coords.latitude, position.coords.longitude]);
  //       },
  //       (error) => {
  //         setPosition([28.5355, 77.391]);
  //         console.error("Error getting location: ", error);
  //       }
  //     );
  //   }
  // }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="border-2 border-primary/20 shadow-xl rounded-xl overflow-hidden">
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "250px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerPosition.map((position, index) => (
            <Marker position={position} key={index}>
              <Popup>{locationDrivers[index].name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-2xl text-center text-main font-medium flex items-center gap-2">
          <span>Loading map </span>
          <ImSpinner2 className="animte-spin" />
        </p>
      )}
    </div>
  );
}

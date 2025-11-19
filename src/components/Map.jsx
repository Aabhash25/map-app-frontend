// PropertyForm.jsx (or Map.jsx)
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddressForm from "./../Forms/AddressForm";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to update map center
function MapUpdater({ center }) {
  const map = useMap();

  React.useEffect(() => {
    if (center) {
      map.setView(center, 15); // Zoom level 15 for close view
    }
  }, [center, map]);

  return null;
}

function Map() {
  const [showModal, setShowModal] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);

  const usBounds = [
    [24.396308, -125.0],
    [49.384358, -66.93457],
  ];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddressSubmit = async (address, pin) => {
    console.log("Searching for address:", address);

    try {
      // Use Nominatim (OpenStreetMap) geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const position = [parseFloat(lat), parseFloat(lon)];

        setMarkerPosition(position);
        setPropertyDetails({
          address: display_name,
          pin: pin,
        });
        setShowModal(false);

        console.log("Location found:", position);
      } else {
        alert("Address not found. Please try a different address.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      alert("Error finding address. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen relative">
      <MapContainer
        bounds={usBounds}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {markerPosition && <MapUpdater center={markerPosition} />}

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">Property Details</h3>
                <p className="text-sm">{propertyDetails.address}</p>
                <p className="text-sm">PIN: {propertyDetails.pin}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-[1000]"
          onClick={handleCloseModal}
        >
          <AddressForm
            onClose={handleCloseModal}
            onSubmit={handleAddressSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default Map;

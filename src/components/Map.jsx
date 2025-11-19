// Map.jsx (updated version)
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import L from "leaflet";
import AddressForm from "./../Forms/AddressForm";
import Toolbar from "./Toolbar";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}

function Map() {
  const [showModal, setShowModal] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [drawMode, setDrawMode] = useState(null); // "polygon" or null
  const featureGroupRef = useRef();
  const mapRef = useRef();
  const drawControlRef = useRef();

  const usBounds = [
    [24.396308, -125.0],
    [49.384358, -66.93457],
  ];

  const handleCloseModal = () => setShowModal(false);

  const handleAddressSubmit = async (address, pin) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const position = [parseFloat(lat), parseFloat(lon)];
        setMarkerPosition(position);
        setPropertyDetails({ address, pin });
        setShowModal(false);
      } else {
        alert("Address not found. Please try again.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to geocode address. Please try again.");
    }
  };

  // Trigger polygon drawing when drawMode changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (drawMode === "polygon") {
      // Programmatically start polygon drawing
      new L.Draw.Polygon(map, {
        shapeOptions: {
          color: "#3b82f6",
          weight: 2,
          fillOpacity: 0.2,
        },
      }).enable();
    }
  }, [drawMode]);

  // When a polygon is created
  const onCreated = (e) => {
    console.log("Polygon drawn:", e.layer.toGeoJSON());
    setDrawMode(null); // Reset draw mode after creating

    // Add the layer to the feature group
    if (featureGroupRef.current) {
      featureGroupRef.current.addLayer(e.layer);
    }
  };

  // Helper to get map ref
  function MapRefSetter() {
    mapRef.current = useMap();
    return null;
  }

  return (
    <div className="h-screen w-screen relative">
      <MapContainer
        bounds={usBounds}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <MapRefSetter />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Drawing Layer - EditControl for onCreated event */}
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topleft"
            onCreated={onCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: false, // Disabled - we control it manually
            }}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        </FeatureGroup>

        {markerPosition && <MapUpdater center={markerPosition} />}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">Property Details</h3>
                <p className="text-sm">{propertyDetails?.address}</p>
                <p className="text-sm">PIN: {propertyDetails?.pin}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Custom Toolbar */}
      <Toolbar drawMode={drawMode} setDrawMode={setDrawMode} />

      {/* Address Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-[1000]"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddressForm
              onClose={handleCloseModal}
              onSubmit={handleAddressSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Map;

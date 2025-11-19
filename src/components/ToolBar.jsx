import React, { useState } from "react";

function Toolbar({ onAddCircle }) {
  const [showRadiusInput, setShowRadiusInput] = useState(false);
  const [radius, setRadius] = useState("");

  const handleRadiusClick = () => {
    setShowRadiusInput(true);
  };

  const handleRadiusSubmit = (e) => {
    e.preventDefault();
    const r = parseFloat(radius);
    if (!isNaN(r) && r > 0) {
      onAddCircle(r); // send radius to parent (Map)
      setShowRadiusInput(false);
      setRadius("");
    } else {
      alert("Please enter a valid radius in meters.");
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-white p-2 rounded shadow space-y-2 z-[1000]">
      {/* Dummy icons */}
      <button className="p-2 bg-gray-200 rounded">🏠</button>
      <button className="p-2 bg-gray-200 rounded">📍</button>
      <button className="p-2 bg-gray-200 rounded" onClick={handleRadiusClick}>
        ⭕ Radius
      </button>

      {showRadiusInput && (
        <form onSubmit={handleRadiusSubmit} className="flex flex-col mt-2">
          <input
            type="number"
            placeholder="Enter radius (meters)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="border p-1 rounded mb-1"
          />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">
            Add Circle
          </button>
        </form>
      )}
    </div>
  );
}

export default Toolbar;

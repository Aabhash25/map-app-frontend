// AddressForm.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

function AddressForm({ onClose, onSubmit }) {
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Please enter an address");
      return;
    }

    setIsLoading(true);
    await onSubmit(address, pin);
    setIsLoading(false);
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-4">Enter Property Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., 1600 Pennsylvania Avenue NW, Washington, DC"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Property PIN</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN code"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Finding Location..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddressForm;

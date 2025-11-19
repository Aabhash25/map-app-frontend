// Toolbar.jsx
import React from "react";
import {
  FaDrawPolygon,
  FaEdit,
  FaTrashAlt,
  FaHandPaper,
  FaSave,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Toolbar = ({ drawMode, setDrawMode }) => {
  const tools = [
    {
      id: "polygon",
      icon: <FaDrawPolygon size={20} />,
      tooltip: "Draw Polygon",
      active: drawMode === "polygon",
    },
    {
      id: "edit",
      icon: <FaEdit size={20} />,
      tooltip: "Edit Layers (coming soon)",
      active: false,
    },
    {
      id: "delete",
      icon: <FaTrashAlt size={20} />,
      tooltip: "Delete Layers (coming soon)",
      active: false,
    },
    {
      id: "hand",
      icon: <FaHandPaper size={20} />,
      tooltip: "Pan Map (coming soon)",
      active: false,
    },
    {
      id: "save",
      icon: <FaSave size={20} />,
      tooltip: "Save Drawing (coming soon)",
      active: false,
    },
  ];

  const handleToolClick = (toolId) => {
    if (toolId === "polygon") {
      // Toggle polygon mode
      setDrawMode((prev) => (prev === "polygon" ? null : "polygon"));
    } else {
      // For dummy tools – just show a message for now
      alert(
        `${tools.find((t) => t.id === toolId).tooltip} is not implemented yet`
      );
    }
  };

  return (
    <div
      className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-3 border border-gray-300"
      style={{ pointerEvents: "auto" }}
    >
      {tools.map((tool) => (
        <button
          key={tool.id}
          data-tooltip-id="toolbar-tooltip"
          data-tooltip-content={tool.tooltip}
          className={`p-3 rounded-md transition-all duration-200 ${
            tool.active
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleToolClick(tool.id)}
        >
          {tool.icon}
        </button>
      ))}

      <Tooltip id="toolbar-tooltip" place="right" />
    </div>
  );
};

export default Toolbar;

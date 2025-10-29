// Component for filtering and sorting bot collection
import { useState } from "react";

function SortBar({ onSort, onFilter }) {
  // Track active filter selection
  const [activeFilter, setActiveFilter] = useState("All");

  // Available bot classes for filtering
  const botClasses = [
    "All",
    "Support",
    "Medic",
    "Assault",
    "Defender",
    "Captain",
    "Witch",
  ];

  // Handle filter button clicks
  const handleFilter = (botClass) => {
    setActiveFilter(botClass);
    onFilter(botClass);
  };

  return (
    <div className="sort-bar">
      {/* Filter section for bot classes */}
      <div className="filter-section">
        <h3>Filter by Class:</h3>
        <div className="filter-buttons">
          {botClasses.map((botClass) => (
            <button
              key={botClass}
              className={`filter-btn ${
                activeFilter === botClass ? "active" : ""
              }`}
              onClick={() => handleFilter(botClass)}
            >
              {botClass}
            </button>
          ))}
        </div>
      </div>

      {/* Sort section for bot stats */}
      <div className="sort-section">
        <h3>Sort by:</h3>
        <div className="sort-buttons">
          <button onClick={() => onSort("health")}>Health</button>
          <button onClick={() => onSort("damage")}>Damage</button>
          <button onClick={() => onSort("armor")}>Armor</button>
        </div>
      </div>
    </div>
  );
}

export default SortBar;

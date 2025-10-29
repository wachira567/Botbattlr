# Bot Battlr Frontend - Detailed Explanation

## Overview

Bot Battlr is a React-based web application that allows users to browse, filter, sort, and build their own bot army from a collection of available bots. The app features a clean, responsive interface with real-time updates and persistent state management.

## Architecture

The application follows a component-based architecture using React hooks for state management. It consists of:

- **Main App Component** (`App.jsx`) - Central state management and API coordination
- **Component Library** - Modular UI components for different features
- **Styling** - CSS-based responsive design
- **API Integration** - RESTful communication with JSON Server backend

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── BotCard.jsx          # Individual bot display component
│   │   ├── BotCollection.jsx    # Grid layout for available bots
│   │   ├── SortBar.jsx          # Filtering and sorting controls
│   │   └── YourBotArmy.jsx      # User's selected bot army display
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles and component styles
│   └── main.jsx                 # Application entry point
├── package.json                 # Dependencies and scripts
└── explain.md                   # This documentation
```

## Core Components

### App.jsx - Main Application Component

The `App.jsx` file serves as the root component and manages all application state:

```jsx
// Main App component for Bot Battlr
import { useState, useEffect } from "react";
import "./App.css";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import SortBar from "./components/SortBar";

// API base URL, uses environment variable or defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

function App() {
  // State for all bots, user's army, displayed bots, and loading status
  const [allBots, setAllBots] = useState([]);
  const [armyBots, setArmyBots] = useState([]);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bots on component mount
  useEffect(() => {
    fetchBots();
  }, []);

  // Fetch bots from API with error handling and fallback
  const fetchBots = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/bots`);
      if (!response.ok) {
        throw new Error("Failed to fetch bots");
      }
      const bots = await response.json();
      setAllBots(bots);
      setDisplayedBots(bots);
    } catch (error) {
      console.error("Error fetching bots:", error);
      // Fallback to mock data if API fails
      const mockBots = [
        {
          id: 101,
          name: "wHz-93",
          health: 94,
          damage: 20,
          armor: 63,
          bot_class: "Support",
          catchphrase: "1010010101001101100011000111101",
          avatar_url:
            "https://robohash.org/nostrumrepellendustenetur.png?size=300x300&set=set1",
        },
        // Add more mock bots as needed
      ];
      setAllBots(mockBots);
      setDisplayedBots(mockBots);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete bot permanently from collection and army
  const deleteBot = async (botId) => {
    try {
      await fetch(`${API_BASE_URL}/bots/${botId}`, {
        method: "DELETE",
      });

      removeFromArmy(botId);
      const updatedBots = allBots.filter((bot) => bot.id !== botId);
      setAllBots(updatedBots);
      setDisplayedBots(updatedBots);
    } catch (error) {
      console.error("Error deleting bot:", error);
      // If API fails, still update frontend
      removeFromArmy(botId);
      const updatedBots = allBots.filter((bot) => bot.id !== botId);
      setAllBots(updatedBots);
      setDisplayedBots(updatedBots);
    }
  };

  // Add bot to user's army if not already present
  const addToArmy = (bot) => {
    const isAlreadyInArmy = armyBots.find((armyBot) => armyBot.id === bot.id);
    if (!isAlreadyInArmy) {
      setArmyBots([...armyBots, bot]);
    }
  };

  // Remove bot from user's army
  const removeFromArmy = (botId) => {
    const updatedArmy = armyBots.filter((bot) => bot.id !== botId);
    setArmyBots(updatedArmy);
  };

  // Sort displayed bots by selected criteria (health, damage, armor)
  const sortBots = (criteria) => {
    const sortedBots = [...displayedBots].sort(
      (a, b) => b[criteria] - a[criteria]
    );
    setDisplayedBots(sortedBots);
  };

  // Filter bots by class or show all
  const filterBots = (botClass) => {
    if (botClass === "All") {
      setDisplayedBots(allBots);
    } else {
      const filteredBots = allBots.filter((bot) => bot.bot_class === botClass);
      setDisplayedBots(filteredBots);
    }
  };

  return (
    <div className="app">
      {/* App header with title and description */}
      <header className="app-header">
        <h1>Bot Battlr</h1>
        <p>Build Your Ultimate Bot Army!</p>
      </header>

      {/* User's bot army section */}
      <YourBotArmy
        armyBots={armyBots}
        onRemove={removeFromArmy}
        onDelete={deleteBot}
      />

      {/* Filter and sort controls */}
      <SortBar onSort={sortBots} onFilter={filterBots} />

      {/* Loading state or bot collection */}
      {isLoading ? (
        <div className="loading">Loading bots...</div>
      ) : (
        <BotCollection
          bots={displayedBots}
          onAddToArmy={addToArmy}
          armyBots={armyBots}
        />
      )}
    </div>
  );
}

export default App;
```

**Key Features:**

- **State Management**: Uses React hooks (`useState`, `useEffect`) to manage bot data, army, and UI state
- **API Integration**: Fetches data from JSON Server with error handling and fallback mock data
- **CRUD Operations**: Handles bot deletion with API calls and optimistic UI updates
- **Data Flow**: Props are passed down to child components for rendering and interaction

### BotCard.jsx - Individual Bot Display

Displays a single bot with its stats and action buttons:

```jsx
// Component to display individual bot information and actions
function BotCard({ bot, onAddToArmy, isInArmy, onDelete }) {
  // Destructure bot properties
  const {
    id,
    name,
    health,
    damage,
    armor,
    bot_class,
    catchphrase,
    avatar_url,
  } = bot;

  // Handle adding bot to army
  const handleAddToArmy = () => {
    onAddToArmy(bot);
  };

  // Handle permanent deletion of bot
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering add to army
    onDelete(id);
  };

  return (
    // Bot card container with conditional styling for army status
    <div
      className={`bot-card ${isInArmy ? "in-army" : ""}`}
      onClick={handleAddToArmy}
    >
      {/* Bot avatar image */}
      <div className="bot-image">
        <img src={avatar_url} alt={name} />
      </div>

      {/* Bot details and stats */}
      <div className="bot-info">
        <h3>{name}</h3>
        <p className="bot-class">{bot_class}</p>
        <p className="catchphrase">"{catchphrase}"</p>

        {/* Health, damage, and armor stats */}
        <div className="bot-stats">
          <div className="stat">
            <span>❤️ {health}</span>
          </div>
          <div className="stat">
            <span>⚔️ {damage}</span>
          </div>
          <div className="stat">
            <span>🛡️ {armor}</span>
          </div>
        </div>
      </div>

      {/* Delete button for permanent removal */}
      <button className="delete-btn" onClick={handleDelete}>
        ✕
      </button>
    </div>
  );
}

export default BotCard;
```

**Features:**

- **Conditional Rendering**: Shows different styles when bot is in army
- **Event Handling**: Click to add to army, separate delete button
- **Visual Stats**: Emojis and clear stat display

### BotCollection.jsx - Bot Grid Layout

Renders a responsive grid of available bots:

```jsx
// Component to display the collection of available bots
import BotCard from "./BotCard";

function BotCollection({ bots, onAddToArmy, armyBots }) {
  // Check if a bot is already in the army
  const isBotInArmy = (botId) => {
    return armyBots.some((armyBot) => armyBot.id === botId);
  };

  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      {/* Grid layout for bot cards */}
      <div className="bots-grid">
        {bots.length === 0 ? (
          <p>No bots available. Try different filters!</p>
        ) : (
          // Render each bot as a card
          bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onAddToArmy={onAddToArmy}
              isInArmy={isBotInArmy(bot.id)}
              onDelete={() => {}} // Delete handled in App component
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BotCollection;
```

### SortBar.jsx - Filtering and Sorting Controls

Provides UI controls for filtering by bot class and sorting by stats:

```jsx
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
```

### YourBotArmy.jsx - User's Army Display

Shows the user's selected bots with release and delete options:

```jsx
// Component to display and manage user's selected bot army
import BotCard from "./BotCard";

function YourBotArmy({ armyBots, onRemove, onDelete }) {
  // Show empty state if no bots in army
  if (armyBots.length === 0) {
    return (
      <div className="your-bot-army empty">
        <h2>Your Bot Army</h2>
        <p>No bots in your army yet. Click on bots to add them!</p>
      </div>
    );
  }

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army ({armyBots.length} bots)</h2>
      {/* Container for army bot cards */}
      <div className="army-bots">
        {armyBots.map((bot) => (
          <div key={bot.id} className="army-bot-card">
            {/* Bot card with release functionality */}
            <BotCard
              bot={bot}
              onAddToArmy={() => onRemove(bot.id)}
              isInArmy={true}
              onDelete={onDelete}
            />
            {/* Release button to remove from army */}
            <button className="release-btn" onClick={() => onRemove(bot.id)}>
              Release
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
```

## Styling (App.css)

The application uses a clean, light theme with CSS Grid and Flexbox for responsive layouts:

```css
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Bot Card */
.bot-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  position: relative;
  border: 1px solid #ddd;
}

.bot-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bot-card.in-army {
  border-color: #007bff;
  background-color: #f0f8ff;
}

/* Responsive Grid */
.bots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
```

## Data Flow and State Management

1. **Initial Load**: `App.jsx` fetches bots from API on mount
2. **User Interactions**:
   - Clicking bot cards adds them to army (prevents duplicates)
   - Filter buttons update `displayedBots` state
   - Sort buttons reorder `displayedBots`
   - Release buttons remove from army
   - Delete buttons permanently remove from collection
3. **State Updates**: All changes are reflected immediately in the UI

## API Integration

The app communicates with a JSON Server backend:

- **GET /bots**: Fetch all available bots
- **DELETE /bots/:id**: Permanently remove a bot

Error handling includes fallback to mock data if the API is unavailable.

## Running the Application

1. **Install Dependencies**:

   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Access the App**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:10000

## Key Features Summary

- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Instant UI feedback for all actions
- **Persistent State**: Army persists during session
- **Error Handling**: Graceful fallbacks for API failures
- **Clean UI**: Simple, readable interface with subtle animations
- **Modular Architecture**: Easy to maintain and extend

This application demonstrates modern React patterns including hooks, component composition, and responsive design principles.

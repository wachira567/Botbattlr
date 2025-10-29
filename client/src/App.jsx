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

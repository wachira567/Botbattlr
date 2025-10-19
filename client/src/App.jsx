import { useState, useEffect } from "react";
import "./App.css";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import SortBar from "./components/SortBar";

// Use environment variable for API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

function App() {
  const [allBots, setAllBots] = useState([]);
  const [armyBots, setArmyBots] = useState([]);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBots();
  }, []);

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

  // Keep all your other functions (addToArmy, removeFromArmy, sortBots, filterBots) the same
  const addToArmy = (bot) => {
    const isAlreadyInArmy = armyBots.find((armyBot) => armyBot.id === bot.id);
    if (!isAlreadyInArmy) {
      setArmyBots([...armyBots, bot]);
    }
  };

  const removeFromArmy = (botId) => {
    const updatedArmy = armyBots.filter((bot) => bot.id !== botId);
    setArmyBots(updatedArmy);
  };

  const sortBots = (criteria) => {
    const sortedBots = [...displayedBots].sort(
      (a, b) => b[criteria] - a[criteria]
    );
    setDisplayedBots(sortedBots);
  };

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
      {/* Your existing JSX remains the same */}
      <header className="app-header">
        <h1>Bot Battlr</h1>
        <p>Build Your Ultimate Bot Army!</p>
      </header>

      <YourBotArmy
        armyBots={armyBots}
        onRemove={removeFromArmy}
        onDelete={deleteBot}
      />

      <SortBar onSort={sortBots} onFilter={filterBots} />

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

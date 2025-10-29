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

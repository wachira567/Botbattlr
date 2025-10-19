import BotCard from "./BotCard";

function BotCollection({ bots, onAddToArmy, armyBots }) {
  // Check if a bot is already in the army
  const isBotInArmy = (botId) => {
    return armyBots.some((armyBot) => armyBot.id === botId);
  };

  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bots-grid">
        {bots.length === 0 ? (
          <p>No bots available. Try different filters!</p>
        ) : (
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

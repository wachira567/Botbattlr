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

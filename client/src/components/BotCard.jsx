function BotCard({ bot, onAddToArmy, isInArmy, onDelete }) {
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

  const handleAddToArmy = () => {
    onAddToArmy(bot);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering add to army
    onDelete(id);
  };

  return (
    <div
      className={`bot-card ${isInArmy ? "in-army" : ""}`}
      onClick={handleAddToArmy}
    >
      <div className="bot-image">
        <img src={avatar_url} alt={name} />
      </div>

      <div className="bot-info">
        <h3>{name}</h3>
        <p className="bot-class">{bot_class}</p>
        <p className="catchphrase">"{catchphrase}"</p>

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

      <button className="delete-btn" onClick={handleDelete}>
        ✕
      </button>
    </div>
  );
}

export default BotCard;

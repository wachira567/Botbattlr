# Bot Battlr - Build Your Ultimate Bot Army

A React web application that allows you to browse, manage, and build your own custom bot army. Built with React, Vite, and JSON Server for a seamless galactic overlord experience.

## Features

### Core Features

- **Browse Bot Collection** - View all available bots with their stats and details
- **Build Your Army** - Add bots to your personal army with a single click
- **Manage Your Forces** - Release bots from your army or discharge them permanently
- **Real-time Updates** - Instant reflection of changes across the application

### Advanced Features

- **Smart Filtering** - Filter bots by class (Support, Medic, Assault, Defender, Captain, Witch)
- **Dynamic Sorting** - Sort bots by health, damage, or armor stats
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Visual Statistics** - Clear visual representation of bot capabilities

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd bot-battlr
   ```

## Install Dependencies

```bash
npm install

## Start the JSON Server (Terminal 1)

json-server --watch db.json --port 8001

## Start the React Application (Terminal 2)
npm run dev

## How to Use
### Building Your Army

Browse Available Bots — Scroll through the collection of available bots.

Add to Army — Click on any bot card to add it to your army.

View Your Army — See your selected bots in the “Your Bot Army” section at the top.

## Managing Your Bots

Release a Bot: Click the “Release” button on any bot in your army.

Delete Permanently: Click the red “✕” button to discharge a bot forever.

Filter Bots: Use the class filter buttons to show specific bot types.

Sort Bots: Use the sort buttons to organize by health, damage, or armor.
```

## Project Structure

```
## src/

 ├── components/

 │ ├── BotCollection.jsx # Displays all available bots

 │ ├── BotCard.jsx # Individual bot component

 │ ├── YourBotArmy.jsx # User's selected bots

 │ └── SortBar.jsx # Filtering and sorting controls

 ├── App.jsx # Main application component

 ├── App.css # Application styles

 └── main.jsx # Application entry point
```

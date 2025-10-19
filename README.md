# Bot Battlr - Build Your Ultimate Bot Army

A React web application that allows you to browse, manage, and build your own custom bot army. Built with React, Vite, and JSON Server for a seamless galactic overlord experience.

## Live Demo

🌐 Frontend Application: https://bot-battlr-frontend-1zco.onrender.com

🔗 Backend API: https://bot-battlr-backend-kwuq.onrender.com/bots

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
   git clone https://github.com/wachira567/Botbattlr.git
   cd bot-battlr
   ```

## Install Dependencies

```# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

## Start the development servers

Terminal 1 - Backend Server:

cd server
npm start

Server runs on: http://localhost:10000

## Terminal 2 - Frontend Application:
cd client
npm run dev


Client runs on: http://localhost:5173

## Access the Application

Frontend: http://localhost:5173

Backend API: http://localhost:10000/bots

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
bot-battlr/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Application styles
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Client dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # JSON server backend
│   ├── db.json            # Database file with bot data
│   ├── server.js          # Server configuration
│   └── package.json       # Server dependencies
└── README.md              # Project documentation
```

## Backend Setup

This project uses JSON Server to provide a mock REST API for the bot data. The server runs locally and provides endpoints for:

- `GET /bots` - Retrieve all bots
- `DELETE /bots/:id` - Remove a bot permanently

## Repository

- **GitHub URL**: [https://github.com/wachira567/Botbattlr](https://github.com/wachira567/Botbattlr)
-

## Technologies Used

### Frontend

- **React 19** - Component-based UI framework
- **Vite** - Build tool and development server
- **CSS3** - Styling with responsive design

### Backend

- **JSON Server** - Mock REST API for bot data
- **Node.js** - Runtime environment

### Deployment

- **Render.com** - Full-stack hosting platform

## API Endpoints

The application interacts with these JSON Server endpoints:

- `GET /bots` - Fetch all available bots
- `DELETE /bots/:id` - Permanently remove a bot from service

Example response:

```json
{
  "id": 101,
  "name": "wHz-93",
  "health": 94,
  "damage": 20,
  "armor": 63,
  "bot_class": "Support",
  "avatar_url": "https://robohash.org/nostrumrepellendustenetur.png"
}
```

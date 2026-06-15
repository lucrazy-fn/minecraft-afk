# 🤖 Mineflayer AFK Bot

> 🇺🇸 English | [🇧🇷 Português](./README.pt.md)

AFK bot for Minecraft servers with support for multiple accounts, automatic login, and automatic reconnection.

> ☁️ **Recommended:** host on a cloud service to keep the bot online 24/7 without leaving your PC on.

## ✨ Features

- Connects multiple accounts simultaneously
- Automatic password login via `/login`
- Auto-reconnect on disconnect (5 seconds)
- Login detection via server chat message
- Staggered connection delay to avoid flood bans

## 📦 Requirements

- [Node.js](https://nodejs.org/) v16 or higher
- npm

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/lucrazy-fn/minecraft-afk.git
cd minecraft-afk

# Install dependencies
npm install
```

## ⚙️ Configuration

Edit the following variables at the top of `index.js`:

```js
const SERVER   = "YourServer.com"  // Server IP or domain
const PORT     = 25565             // Server port
const PASSWORD = "YourPassword"    // Password used in /login

const CONTAS = [
  "Account1",
  "Account2"
]
```

## ▶️ Running locally

```bash
node index.js
```

Each account connects with a 4-second delay between them. After spawning, the bot will attempt to log in every 500ms until it receives confirmation from the server.

## ☁️ Cloud hosting (recommended)

To keep the bot running 24/7 without leaving your computer on, host it on one of these services:

---

### 🚄 [Railway](https://railway.app) — *easiest, recommended*

Free plan available. Deploy directly from GitHub in a few clicks.

1. Create an account at [railway.app](https://railway.app)
2. Click **New Project → Deploy from GitHub repo**
3. Select this repository
4. Go to **Variables** and add your environment variables (see below)
5. The bot starts automatically

---

### 🟣 [Render](https://render.com)

Free plan with 750h/month. Great alternative to Railway.

1. Create an account at [render.com](https://render.com)
2. Click **New → Background Worker**
3. Connect your GitHub repository
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add environment variables and click **Create**

---

### 🔷 [Koyeb](https://www.koyeb.com)

Free plan with always-on instances (no sleep).

1. Create an account at [koyeb.com](https://www.koyeb.com)
2. Click **Create App → GitHub**
3. Select the repository
4. Run command: `node index.js`
5. Add variables and deploy

---

### 🌊 [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

Paid, but stable and reliable for continuous use.

1. Create an app under **Apps → Create App**
2. Connect your GitHub repository
3. Type: **Worker**
4. Add environment variables
5. Choose a plan and deploy

---

### 🖥️ VPS (advanced)

If you prefer full control, use any VPS (DigitalOcean Droplet, Contabo, Hostinger VPS, etc.) with Node.js installed and run the bot with [PM2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start index.js --name afk-bot
pm2 save
pm2 startup
```

---

### 🔐 Environment variables (recommended for cloud)

Instead of hardcoding your password and server IP, use environment variables:

```js
const SERVER   = process.env.SERVER   || "YourServer.com"
const PORT     = process.env.PORT     || 25565
const PASSWORD = process.env.PASSWORD || "YourPassword"
```

Set them in the dashboard of your chosen service:

| Variable   | Example              |
|------------|----------------------|
| `SERVER`   | `mc.yourserver.com`  |
| `PORT`     | `25565`              |
| `PASSWORD` | `your_password`      |

## 📋 Sample output

```
[Account1] Spawned, attempting login...
[Account1] ✔ Logged in and AFK
[Account2] Spawned, attempting login...
[Account2] ✔ Logged in and AFK
[Account1] Disconnected, reconnecting in 5s...
```

## 🔧 How it works

1. For each account in `CONTAS`, a bot is created with a delay of `index × 4000ms`
2. After spawning, the bot sends `/login <password>` every 500ms (up to 15 attempts)
3. The bot monitors the server chat for the keywords `logado`, `sucesso`, or `bem vindo`
4. Once login is detected, it stops sending the command and goes AFK
5. If the connection drops, it automatically reconnects after 5 seconds

## 📁 Project structure

```
.
├── index.js      # Main script
├── package.json  # Dependencies and project config
├── README.md     # Português
└── README.en.md  # English
```

## 📦 package.json

The project uses a minimal `package.json` with a single dependency:

```json
{
  "name": "minecraft-afk",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "mineflayer": "^4.16.0"
  }
}
```

For cloud services like Railway and Render, make sure `package.json` is at the root of the repository — they automatically detect it as a Node.js project and run `npm install` before starting.

## ⚠️ Disclaimer

Use this bot only on servers where you have permission. Misuse may result in your account or IP being banned.

## 📄 License

MIT

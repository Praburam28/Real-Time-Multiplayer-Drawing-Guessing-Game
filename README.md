<div align="center">

# 🎨 Real-Time Multiplayer Drawing & Guessing Game

**Draw it. Guess it. Beat the clock. Play together.**

A full-stack multiplayer drawing and word-guessing game built with FastAPI, React, TypeScript, WebSockets, and MySQL.

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/DevOps-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📖 About

**Real-Time Multiplayer Drawing & Guessing Game** is a browser-based game where players join a room, take turns drawing a secret word, and guess what other players are drawing.

The frontend uses **React, TypeScript, and Vite**. The backend uses **FastAPI** and **WebSockets** to exchange real-time game events, while **MySQL** stores application data.

## ✨ Features

| Feature | Description |
|---|---|
| 👥 Multiplayer rooms | Create or join a room using a room code. |
| 🟢 Live lobby | Receive player and ready-status updates. |
| 🎮 Round-based game | Play through multiple drawing rounds. |
| ✏️ Drawing canvas | Draw using mouse input. |
| 🎨 Drawing tools | Select colors and adjust brush size. |
| 💬 Word guessing | Submit guesses during a drawing round. |
| ⚡ Real-time events | Exchange gameplay updates through WebSockets. |
| 🏆 Scoring | Track player scores during the game. |
| 🔐 Authentication | Use token-based player authentication. |
| 📱 Browser interface | Play from a modern web browser. |
| 🐳 Docker support | Run MySQL in a container for local development. |
| 📚 API docs | Explore backend endpoints through Swagger UI. |

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI components | Material UI (MUI) |
| Backend | Python, FastAPI |
| Real-time communication | WebSockets |
| Database | MySQL 8 |
| Authentication | JWT / token-based authentication |
| API testing | Swagger UI, Postman |
| Containers | Docker, Docker Compose |
| Tools | VS Code, Git, npm |

## 🏗️ Architecture

```text
              ┌─────────────────────────┐
              │      React Frontend     │
              │    TypeScript + Vite    │
              └────────────┬────────────┘
                           │
                    REST API + WebSocket
                           │
                           ▼
              ┌─────────────────────────┐
              │      FastAPI Backend    │
              │   Lobby • Game • Auth   │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │        MySQL 8          │
              │   Persistent App Data   │
              └─────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

Install these tools before running the project:

- [Python](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd realtime-drawing-game-main
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository's clone URL. If the project folder has a different name, change the `cd` command accordingly.

### 2. Start MySQL

Run this command from the directory containing your Compose file:

```bash
docker compose up -d mysql
docker compose ps
```

Use the database name, username, password, and port configured in your Compose file and backend settings. Never commit real credentials to GitHub.

### 3. Configure and run the backend

Open a terminal in the project root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

If your repository contains `requirements.txt`, install dependencies:

```powershell
pip install -r requirements.txt
```

Configure the backend environment variables using the example environment file supplied with the project, if available. Make sure the database connection and authentication settings match your local setup.

Start FastAPI:

```powershell
python -m uvicorn app.main:app --reload
```

Backend URL: `http://127.0.0.1:8000`

Swagger documentation: `http://127.0.0.1:8000/docs`

### 4. Configure and run the frontend

Open a **new terminal**:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, commonly:

`http://localhost:5173`

Configure the frontend API base URL using the environment-variable name expected by your project.

### 5. Start playing

1. Open the frontend in your browser.
2. Create a room or join one using its room code.
3. Open another browser session or device and join the same room.
4. Mark both players as ready.
5. Start the game from the lobby.
6. The assigned drawer draws the secret word.
7. Other players submit guesses.
8. Continue through the rounds and track the scores.

> **Gameplay rule:** Only the player assigned as the drawer can draw during an active round. Other players guess the word.

## 🔌 API Documentation

With the backend running, use:

| Resource | URL |
|---|---|
| Swagger UI | `http://127.0.0.1:8000/docs` |
| OpenAPI schema | `http://127.0.0.1:8000/openapi.json` |

Use Swagger UI to inspect the routes exposed by your running backend. Exact endpoints can vary by project version.

## 🧪 Testing Checklist

- [ ] Backend starts without errors.
- [ ] MySQL container is running and reachable.
- [ ] Frontend loads successfully.
- [ ] A room can be created.
- [ ] Two players can join the same room.
- [ ] Ready status updates correctly.
- [ ] Start Game initializes the first round.
- [ ] A drawer is assigned.
- [ ] The drawer can draw with different colors and brush sizes.
- [ ] Other players receive drawing updates.
- [ ] Guesses are submitted correctly.
- [ ] Round progression and scores work as expected.

## 🛠️ Troubleshooting

| Issue | What to check |
|---|---|
| Missing Python package | Activate `.venv` and install dependencies from the project's dependency file. |
| MySQL connection error | Check `docker compose ps`, database credentials, database name, and host port. |
| Frontend cannot reach API | Confirm FastAPI is running and verify the frontend API base URL. |
| WebSocket connection fails | Check the room code, player ID/token, backend URL, and browser console. |
| Game stays on Round 0 | Check the Start Game API response and verify the backend creates a round and assigns a drawer. |
| Drawing is disabled | Confirm the round is active and the current player is the assigned drawer. |

## 🔒 Security

- Keep `.env` files, passwords, signing keys, and tokens out of version control.
- Use strong secret keys in deployed environments.
- Restrict CORS origins in production.
- Never use development database credentials in production.
- Use HTTPS/WSS for public deployments.

## 🗺️ Future Improvements

- ⏱️ Round timer and countdown
- 💡 Word hints and difficulty levels
- 🥇 Leaderboards and match summaries
- 😀 Chat and emoji reactions
- 📈 Player statistics and game history
- 🚀 CI/CD and production deployment
- 🧪 Expanded automated test coverage

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push your branch: `git push origin feature/your-feature`
5. Open a Pull Request.

## 📄 License

Choose a license before distributing this project publicly. If you select the MIT License, add a `LICENSE` file containing the MIT License text.

---

👨‍💻 Author
Praburam R

<div align="center">

**🎨 Built for creativity, collaboration, and fun.**

If you like this project, consider giving the repository a ⭐

</div>

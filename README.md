::: {align="center"}
🎨 Real-Time Multiplayer Drawing & Guessing Game
Draw it. Guess it. Beat the clock. Play together.
A full-stack multiplayer drawing and word-guessing game with live room
updates, interactive drawing tools, and real-time gameplay.
```{=html}
<p>
```
`<img src="https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />`{=html}
`<img src="https://img.shields.io/badge/React-TypeScript-3178C6?style=for-the-badge&logo=react&logoColor=white" alt="React and TypeScript" />`{=html}
`<img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />`{=html}
`<img src="https://img.shields.io/badge/Communication-WebSockets-6A5ACD?style=for-the-badge" alt="WebSockets" />`{=html}
`<img src="https://img.shields.io/badge/Container-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />`{=html}
```{=html}
</p>
```
:::
---
📌 About the Project
Real-Time Multiplayer Drawing & Guessing Game is a browser-based
game where players join a room, take turns drawing a secret word, and
try to guess what another player is drawing.
The frontend is built with React, TypeScript, and Vite, while the
backend uses FastAPI and WebSockets for real-time communication.
MySQL stores application data, and Docker can be used to run the
database service.
✨ Features
👥 Room-based multiplayer --- create or join a room using a room
code.
🟢 Live lobby updates --- see player and ready-status changes.
🎮 Round-based gameplay --- play through multiple rounds.
✏️ Interactive drawing canvas --- draw with mouse input.
🎨 Drawing tools --- choose colors and adjust brush size.
💬 Word guessing --- enter guesses during the drawing round.
⚡ Real-time communication --- exchange game events using
WebSockets.
🏆 Player scores --- track scores during the game.
🔐 Token-based player authentication --- authenticate player
connections.
📱 Responsive interface --- use the game from a modern browser.
🐳 Docker-supported database --- run MySQL in a container for
local development.
📖 API documentation --- explore backend endpoints with FastAPI
Swagger UI.
🧰 Tech Stack
Area                Technologies
---
Frontend            React, TypeScript, Vite
UI                  Material UI (MUI)
Backend             Python, FastAPI
Real-time           WebSockets
Database            MySQL 8
Authentication      JWT / token-based authentication
API testing         Swagger UI, Postman
Containers          Docker, Docker Compose
Development tools   VS Code, Git, npm
🏗️ High-Level Architecture
``` text
┌──────────────────────────┐
│      React Frontend      │
│   TypeScript + Vite      │
└────────────┬─────────────┘
             │ REST API
             │ WebSocket
             ▼
┌──────────────────────────┐
│      FastAPI Backend     │
│  Game, Lobby, Auth APIs  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│        MySQL 8           │
│   Persistent App Data    │
└──────────────────────────┘
```
🚀 Getting Started
Follow these steps to run the project locally. Commands below assume a
Windows PowerShell terminal and that Python, Node.js/npm, and Docker
Desktop are installed.
1. Clone the repository
``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd realtime-drawing-game-main
```
Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository's clone URL.
If your repository uses a different folder name, enter that folder
instead.
2. Start MySQL
From the directory containing `docker-compose.yml` (or `compose.yaml`),
start the database service:
``` bash
docker compose up -d mysql
```
Check the running services:
``` bash
docker compose ps
```
Use the database name, username, password, and port configured in your
local Compose file and backend environment settings. Do not commit real
credentials to GitHub.
3. Set up the backend
Open a terminal in the backend directory:
``` powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```
Install the project's dependencies using the dependency file included in
your repository. For example, if the project contains
`requirements.txt`:
``` powershell
pip install -r requirements.txt
```
Configure the backend environment variables using the example
environment file provided by the project, if available. Ensure the
database URL and authentication settings match your local setup.
Start the API server:
``` powershell
python -m uvicorn app.main:app --reload
```
Backend API: http://127.0.0.1:8000
Interactive API documentation: http://127.0.0.1:8000/docs
> If your project uses a different dependency file or environment
> variable names, follow the configuration included in the repository.
4. Set up the frontend
Open a separate terminal:
``` powershell
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite in your terminal, commonly
http://localhost:5173.
Configure the frontend API base URL using the environment-variable name
expected by the project. For local development, the backend commonly
runs at `http://127.0.0.1:8000`.
5. Play the game
Open the frontend in your browser.
Create a room or join an existing room with its room code.
Open a second browser session or another device and join the same
room with a second player.
Mark both players as ready.
Start the game from the lobby.
The assigned drawer uses the canvas, color picker, and brush-size
control.
The other player guesses the secret word.
Continue through the rounds and track the scores.
Gameplay note: In each round, the assigned drawer draws while the
other players guess. Drawing is enabled only when a round is active and
the current player is the assigned drawer.
🔌 API Documentation
When the backend is running, open:
Swagger UI: `http://127.0.0.1:8000/docs`
OpenAPI schema: `http://127.0.0.1:8000/openapi.json`
Use Swagger UI to inspect the routes and schemas actually exposed by
your running backend. API routes may vary by project version.
🧪 Testing Checklist
[ ] Backend starts without import or configuration errors.
[ ] MySQL container is running and the backend can connect.
[ ] Frontend loads successfully.
[ ] A room can be created.
[ ] Two players can join the same room.
[ ] Ready status updates correctly.
[ ] Start Game initializes the first round.
[ ] A drawer is assigned.
[ ] The drawer can draw using different colors and brush sizes.
[ ] Drawing updates are visible to other players.
[ ] Guesses are submitted and game events update.
[ ] Round progression and scoring behave as expected.
🛠️ Troubleshooting
---
Problem                             Things to check
---
Backend dependency error            Activate `.venv` and install
dependencies from the repository's
dependency file.
MySQL connection failure            Check `docker compose ps`, the
database credentials, database
name, and host port.
Frontend cannot reach API           Confirm the backend is running and
check the frontend API base URL.
WebSocket does not connect          Check the room code, player
ID/token, backend URL, and browser
console.
Game stays on Round 0               Check the backend response when
Start Game is clicked and verify
that the backend creates a round
and assigns a drawer.
Drawing is disabled                 Confirm the round is active and the
current player is the assigned
drawer.
🔒 Security Notes
Keep `.env` files, database passwords, signing keys, and tokens out
of version control.
Use a strong secret key for deployments.
Configure production CORS origins explicitly.
Do not use development database credentials in production.
Use HTTPS/WSS when deploying publicly.
🗺️ Possible Future Improvements
⏱️ Round timer and countdown
💡 Word hints and difficulty levels
🥇 Leaderboard and match summary
😀 Chat and emoji reactions
📈 Player statistics and game history
🚀 Production deployment with CI/CD
🧪 Automated backend and frontend test coverage
🤝 Contributing
Contributions and suggestions are welcome.
Fork the repository.
Create a branch: `git checkout -b feature/your-feature`.
Commit your changes: `git commit -m "Add your feature"`.
Push the branch: `git push origin feature/your-feature`.
Open a Pull Request.
📄 License
Choose a license before distributing the project publicly. If you intend
to use the MIT License, add a `LICENSE` file containing the MIT License
text and update this section accordingly.
---
::: {align="center"}
💙 Built for real-time collaboration, creativity, and fun.
If you like this project, consider giving the repository a ⭐
:::

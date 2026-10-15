
import { useState } from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import PlaceholderPage from "./pages/PlaceholderPage";
import LobbyPage from "./features/lobby/LobbyPage";
import GamePage from "./features/game/GamePage";
import { joinRoom } from "./api/auth";
import apiClient from "./api/client";

interface CreateRoomResponse {
  room_code: string;
  total_rounds: number;
  current_round: number;
  status: string;
}

function getApiErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            detail?: string | Array<{ msg?: string }>;
          };
        };
      }
    ).response;

    const detail = response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail
        .map((item) => item.msg ?? "Invalid input")
        .join(", ");
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function HomePage() {
  const navigate = useNavigate();

  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [totalRounds, setTotalRounds] = useState(3);

  const [errorMessage, setErrorMessage] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const openJoinDialog = () => {
    setErrorMessage("");
    setJoinDialogOpen(true);
  };

  const closeJoinDialog = () => {
    if (isJoining) return;

    setJoinDialogOpen(false);
    setErrorMessage("");
  };

  const openCreateDialog = () => {
    setErrorMessage("");
    setCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    if (isCreating) return;

    setCreateDialogOpen(false);
    setErrorMessage("");
  };

  const handleJoinRoom = async () => {
    const cleanUsername = username.trim();
    const cleanRoomCode = roomCode.trim().toUpperCase();

    if (!cleanUsername || !cleanRoomCode) {
      setErrorMessage("Enter your player name and room code.");
      return;
    }

    setIsJoining(true);
    setErrorMessage("");

    try {
      await joinRoom(cleanRoomCode, {
        display_name: cleanUsername,
      });

      setJoinDialogOpen(false);
      navigate(`/lobby/${encodeURIComponent(cleanRoomCode)}`);
    } catch (error: unknown) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateRoom = async () => {
    const cleanUsername = createUsername.trim();

    if (!cleanUsername) {
      setErrorMessage("Enter your player name.");
      return;
    }

    setIsCreating(true);
    setErrorMessage("");

    try {
      // Create a room using the actual backend endpoint.
      const response = await apiClient.post<CreateRoomResponse>(
        "/rooms",
        {
          total_rounds: totalRounds,
        },
      );

      const newRoomCode = response.data.room_code
        ?.trim()
        .toUpperCase();

      if (!newRoomCode) {
        throw new Error(
          "The room was created, but the server did not return a room code.",
        );
      }

      // Register the creator as the first player in the room.
      await joinRoom(newRoomCode, {
        display_name: cleanUsername,
      });

      setCreateDialogOpen(false);

      // Show the room code in the lobby so friends can join.
      navigate(`/lobby/${encodeURIComponent(newRoomCode)}`);
    } catch (error: unknown) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fc",
        color: "#172033",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderBottom: "1px solid rgba(31,41,55,0.10)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 76 }}>
            <SportsEsportsRoundedIcon
              sx={{ color: "#4f46e5", fontSize: 34, mr: 1.5 }}
            />

            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
            >
              Draw<span style={{ color: "#4f46e5" }}>Together</span>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="outlined"
              onClick={openJoinDialog}
              sx={{
                color: "#172033",
                borderColor: "rgba(31,41,55,0.18)",
                borderRadius: 3,
                px: 2.5,
                "&:hover": {
                  borderColor: "#4f46e5",
                  bgcolor: "rgba(79,70,229,0.1)",
                },
              }}
            >
              Join a Game
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: { xs: "auto", md: "75vh" },
            py: { xs: 8, md: 12 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 5, lg: 7 },
            flexWrap: { xs: "wrap", lg: "nowrap" },
          }}
        >
          <Box sx={{ maxWidth: 700, flex: "1 1 520px", position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                mb: 3,
                borderRadius: 10,
                bgcolor: "rgba(79,70,229,0.12)",
                border: "1px solid rgba(79,70,229,0.3)",
              }}
            >
              <DrawRoundedIcon sx={{ color: "#4f46e5", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{ color: "#4338ca", fontWeight: 600 }}
              >
                Draw • Guess • Compete
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4.8rem" },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-3px",
                mb: 3,
              }}
            >
              Your friends.
              <br />
              Your canvas.
              <br />
              <Box component="span" sx={{ color: "#4f46e5" }}>
                Your next big win.
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#667085",
                fontSize: { xs: "1rem", md: "1.2rem" },
                lineHeight: 1.8,
                maxWidth: 620,
                mb: 4,
              }}
            >
              A little art, a little chaos, and a lot of friendly competition.
              Create a room, sketch the unexpected, and race your friends to
              guess the word before the clock runs out.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 7 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<DrawRoundedIcon />}
                onClick={openCreateDialog}
                sx={{
                  bgcolor: "#4f46e5",
                  color: "#172033",
                  px: 4,
                  py: 1.7,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#4338ca" },
                }}
              >
                Create Room
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<GroupsRoundedIcon />}
                onClick={openJoinDialog}
                sx={{
                  color: "#172033",
                  borderColor: "rgba(31,41,55,0.25)",
                  px: 4,
                  py: 1.7,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#4f46e5",
                    bgcolor: "rgba(79,70,229,0.08)",
                  },
                }}
              >
                Join a Room
              </Button>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmojiObjectsRoundedIcon
                  sx={{ color: "#f5c76b", fontSize: 28 }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    Guess the word
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#667085" }}>
                    Think fast and score points
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <GroupsRoundedIcon sx={{ color: "#059669", fontSize: 28 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    Play with friends
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#667085" }}>
                    Compete in multiplayer rooms
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box
            aria-hidden="true"
            sx={{
              flex: "0 1 430px",
              width: "100%",
              minWidth: 0,
              position: "relative",
              display: { xs: "none", md: "block" },
              transform: { lg: "rotate(2deg)" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 116,
                height: 116,
                borderRadius: "32px",
                bgcolor: "#ffedd5",
                right: -18,
                top: -28,
                transform: "rotate(15deg)",
              }}
            />
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                p: 2.5,
                borderRadius: "28px !important",
                border: "1px solid #e8eaf3",
                bgcolor: "rgba(255,255,255,0.92)",
                boxShadow: "0 30px 80px rgba(49,46,129,0.13)",
                overflow: "hidden",
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box>
                  <Typography sx={{ color: "#667085", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em" }}>
                    LIVE ROOM
                  </Typography>
                  <Typography sx={{ color: "#172033", fontWeight: 800, fontSize: 20 }}>
                    The sketch-off
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1.2, py: 0.7, borderRadius: 99, bgcolor: "#ecfdf5", color: "#047857", fontSize: 12, fontWeight: 800 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#10b981" }} /> LIVE
                </Box>
              </Stack>
              <Box sx={{ height: 255, borderRadius: "18px", border: "1px solid #e8eaf3", bgcolor: "#fffdf8", position: "relative", overflow: "hidden", backgroundImage: "radial-gradient(#dfe3ed 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
                <Box sx={{ position: "absolute", left: "18%", top: "19%", width: 112, height: 112, borderRadius: "50%", bgcolor: "#fde68a", border: "4px solid #172033" }} />
                <Box sx={{ position: "absolute", left: "44%", top: "34%", width: 112, height: 70, borderRadius: "50% 50% 12px 12px", bgcolor: "#fb7185", border: "4px solid #172033", transform: "rotate(-12deg)" }} />
                <Box sx={{ position: "absolute", left: "34%", top: "53%", width: 100, height: 7, bgcolor: "#4f46e5", borderRadius: 10, transform: "rotate(32deg)" }} />
                <Box sx={{ position: "absolute", left: "26%", top: "63%", width: 85, height: 7, bgcolor: "#4f46e5", borderRadius: 10, transform: "rotate(-24deg)" }} />
                <Box sx={{ position: "absolute", right: 22, top: 20, color: "#f97316", fontSize: 30, fontWeight: 900, transform: "rotate(12deg)" }}>✳</Box>
                <Box sx={{ position: "absolute", left: 20, bottom: 18, px: 1.4, py: 0.8, borderRadius: 2, bgcolor: "#172033", color: "#fff", fontSize: 12, fontWeight: 700 }}>What could it be?</Box>
              </Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                <Stack direction="row" spacing={-0.7}>
                  {["#4f46e5", "#fb7185", "#10b981", "#f59e0b"].map((color, index) => (
                    <Avatar key={color} sx={{ width: 34, height: 34, border: "3px solid #fff", bgcolor: color, fontSize: 12, zIndex: 4 - index }}>
                      {["M", "A", "J", "+"][index]}
                    </Avatar>
                  ))}
                </Stack>
                <Typography sx={{ color: "#667085", fontSize: 13, fontWeight: 700 }}>4 friends drawing</Typography>
              </Stack>
            </Paper>
            <Box sx={{ position: "absolute", left: -26, bottom: 44, px: 2, py: 1.2, borderRadius: "16px", bgcolor: "#4f46e5", color: "#fff", boxShadow: "0 14px 28px rgba(79,70,229,0.25)", fontWeight: 800, fontSize: 13, transform: "rotate(-5deg)" }}>
              +250 points!
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Create Room Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={closeCreateDialog}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#ffffff",
              color: "#172033",
              borderRadius: 4,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
          Create a Room
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "#667085", mb: 3 }}>
            Choose your player name and the number of rounds. Your friends can
            join using the room code.
          </Typography>

          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => setErrorMessage("")}
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Your player name"
              value={createUsername}
              onChange={(event) => setCreateUsername(event.target.value)}
              fullWidth
              disabled={isCreating}
              slotProps={{ htmlInput: { maxLength: 30 } }}
              sx={darkFieldStyles}
            />

            <TextField
              select
              label="Number of rounds"
              value={totalRounds}
              onChange={(event) => setTotalRounds(Number(event.target.value))}
              fullWidth
              disabled={isCreating}
              sx={darkFieldStyles}
            >
              {[1, 2, 3, 4, 5].map((rounds) => (
                <MenuItem key={rounds} value={rounds}>
                  {rounds} {rounds === 1 ? "round" : "rounds"}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={closeCreateDialog}
            disabled={isCreating}
            sx={{ color: "#667085" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!createUsername.trim() || isCreating}
            onClick={() => void handleCreateRoom()}
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            {isCreating ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Create & Enter"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Room Dialog */}
      <Dialog
        open={joinDialogOpen}
        onClose={closeJoinDialog}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#ffffff",
              color: "#172033",
              borderRadius: 4,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
          Join a Game
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "#667085", mb: 3 }}>
            Enter your player name and the room code shared by your friend.
          </Typography>

          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => setErrorMessage("")}
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Your player name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              fullWidth
              disabled={isJoining}
              slotProps={{ htmlInput: { maxLength: 30 } }}
              sx={darkFieldStyles}
            />

            <TextField
              label="Room code"
              value={roomCode}
              onChange={(event) =>
                setRoomCode(event.target.value.toUpperCase())
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" && !isJoining) {
                  void handleJoinRoom();
                }
              }}
              fullWidth
              disabled={isJoining}
              slotProps={{ htmlInput: { maxLength: 20 } }}
              sx={darkFieldStyles}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={closeJoinDialog}
            disabled={isJoining}
            sx={{ color: "#667085" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!username.trim() || !roomCode.trim() || isJoining}
            onClick={() => void handleJoinRoom()}
            sx={{
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            {isJoining ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Join Room"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const darkFieldStyles = {
  "& .MuiInputLabel-root": { color: "#667085" },
  "& .MuiOutlinedInput-root": {
    color: "#172033",
    "& fieldset": {
      borderColor: "rgba(31,41,55,0.20)",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#667085",
  },
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby/:roomCode" element={<LobbyPage />} />
        <Route path="/game/:roomCode" element={<GamePage />} />

        <Route
          path="/results/:roomCode"
          element={
            <PlaceholderPage
              title="Game Results"
              description="Final scores, rankings, and game history will appear here."
            />
          }
        />

        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page Not Found"
              description="This page doesn't exist. Return home to start playing."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

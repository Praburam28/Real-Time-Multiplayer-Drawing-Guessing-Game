
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fc",
        color: "#172033",
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 2 }}
        >
          {title}
        </Typography>

        <Typography
          sx={{ color: "#667085", lineHeight: 1.8, mb: 4 }}
        >
          {description}
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#4f46e5",
            borderRadius: 3,
            px: 3,
            py: 1.3,
            textTransform: "none",
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default PlaceholderPage;

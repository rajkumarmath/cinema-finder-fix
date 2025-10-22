import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { MdLocationOn, MdStar, MdClose } from "react-icons/md";

const CinemaInfoPanel = () => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    const handleCinemaSelected = (event) => {
      setSelectedCinema(event.detail);
    };

    window.addEventListener("cinema.selected", handleCinemaSelected);

    return () => {
      window.removeEventListener("cinema.selected", handleCinemaSelected);
    };
  }, []);

  const handleClose = () => {
    setSelectedCinema(null);
  };

  if (!selectedCinema) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mt: 2, position: "relative" }}>
      <Button
        size="small"
        onClick={handleClose}
        sx={{ position: "absolute", top: 8, right: 8, minWidth: "auto" }}
      >
        <MdClose />
      </Button>

      <Typography variant="h6" gutterBottom>
        {selectedCinema.name}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <MdLocationOn />
        <Typography variant="body2" color="text.secondary">
          {selectedCinema.address ||
            `${selectedCinema.lat}, ${selectedCinema.lng}`}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          icon={<MdStar />}
          label={selectedCinema.rating || "No rating"}
          size="small"
          variant="outlined"
        />
        <Chip
          label={
            selectedCinema.countryCode === "au" ? "Australia" : "New Zealand"
          }
          size="small"
          variant="outlined"
          color="primary"
        />
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body2">
        {selectedCinema.description || "More information coming soon..."}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Cinema Details:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label={`Franchise: ${selectedCinema.franchise || "Unknown"}`}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default CinemaInfoPanel;

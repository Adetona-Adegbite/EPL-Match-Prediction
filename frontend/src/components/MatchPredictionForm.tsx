import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import TimePicker from "./TimePicker";
import classes from "./MatchPredictionForm.module.css";
import {
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const teams = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Liverpool",
  "Luton Town",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Sheffield United",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers",
];

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const gameWeeks = Array.from({ length: 38 }, (_, i) => i + 1); // 38 game weeks

const MatchPrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    gameWeek: "",
    homeTeam: "",
    awayTeam: "",
  });

  const [alert, setAlert] = useState<{ data: string; severity: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = (time: string) => {
    setFormData({
      ...formData,
      time,
    });
  };

  const handleSubmit = async () => {
    const { day, time, gameWeek, homeTeam, awayTeam } = formData;

    if (!day || !time || !gameWeek || !homeTeam || !awayTeam) {
      setAlert({ data: "Please fill in all fields.", severity: "warning" });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://epl-prediction-fza0h8fcgtdqarcf.eastus-01.azurewebsites.net/predict",
        formData
      );
      console.log(response);

      setAlert({
        data: `Prediction result: ${response.data.prediction}`,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        data: "Error submitting prediction. Try again later",
        severity: "error",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container
      className={classes.container}
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
      }}
    >
      {alert && (
        <Alert
          //@ts-ignore

          severity={alert.severity}
        >
          {alert.data}
        </Alert>
      )}
      <Typography variant="h4" align="center" fontSize={28} mt={5} gutterBottom>
        EPL Match Prediction
      </Typography>
      <div
        className={classes["social-icons"]}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <a
          href="https://www.instagram.com/tona_tech?igsh=MTU0em1jMGl5MnJ0aw%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.tiktok.com/@tona_tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok size={20} />
        </a>
        <a href="mailto:adetona67@gmail.com">
          <FaEnvelope size={20} />
        </a>
        <a
          href="www.linkedin.com/in/adetona-adegbite-3a6a7916a"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
      <a
        href="https://github.com/Adetona-Adegbite/Youtube-Downloader.git"
        target="_blank"
        rel="noopener noreferrer"
        className={classes["github-button"]}
      >
        Contribute to this Project
        <FaGithub size={24} color="white" />
      </a>
      <Box mt={4}>
        <TextField
          select
          label="Day"
          name="day"
          value={formData.day}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "8px",
              "& .MuiInputBase-root": {
                height: "40px", // Adjust this value as needed
              },
            },
          }}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Game Week"
          name="gameWeek"
          value={formData.gameWeek}
          onChange={handleChange}
          fullWidth
          color="secondary"
          margin="normal"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "8px",
              "& .MuiInputBase-root": {
                height: "40px", // Adjust this value as needed
              },
            },
          }}
        >
          {gameWeeks.map((week) => (
            <MenuItem key={week} value={week}>
              {week}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Home Team"
          name="homeTeam"
          value={formData.homeTeam}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "8px",
              "& .MuiInputBase-root": {
                height: "40px", // Adjust this value as needed
              },
            },
          }}
        >
          {teams.map((team) => (
            <MenuItem
              key={team}
              value={team}
              disabled={team === formData.awayTeam}
            >
              {team}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Away Team"
          name="awayTeam"
          value={formData.awayTeam}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          sx={{
            marginBottom: 4,

            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "8px",
              "& .MuiInputBase-root": {
                height: "40px", // Adjust this value as needed
              },
            },
          }}
        >
          {teams.map((team) => (
            <MenuItem
              key={team}
              value={team}
              disabled={team === formData.homeTeam}
            >
              {team}
            </MenuItem>
          ))}
        </TextField>
        <Grid item xs={12}>
          <TimePicker onTimeChange={handleTimeChange} />
        </Grid>
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            marginTop: 5,
            background: "#734CC1",
            ":hover": {
              backgroundColor: "#BCACDD",
            },
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "8px",
              height: "40px", // Adjust this value as needed
            },
          }}
        >
          {loading ? <ClipLoader color="#ffffff" size={20} /> : "Predict"}{" "}
        </Button>
      </Box>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        style={{ marginTop: "20px" }}
      >
        Disclaimer: This is just an ML side project and may not be accurate.
      </Typography>
    </Container>
  );
};

export default MatchPrediction;

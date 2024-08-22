import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";

interface TimePickerProps {
  onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = ["00", "30"];

  const handleHourChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newHour = event.target.value as string;
    setHour(newHour);
    onTimeChange(`${newHour}${minute}`);
  };

  const handleMinuteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMinute = event.target.value as string;
    setMinute(newMinute);
    onTimeChange(`${hour}${newMinute}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel color="secondary">Hour</InputLabel>

          <Select
            value={hour}
            //@ts-ignore
            onChange={handleHourChange}
            color="secondary"
          >
            {hours.map((hr) => (
              <MenuItem key={hr} value={hr}>
                {hr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel color="secondary">Minute</InputLabel>
          <Select
            value={minute}
            //@ts-ignore

            onChange={handleMinuteChange}
            color="secondary"
          >
            {minutes.map((min) => (
              <MenuItem key={min} value={min}>
                {min}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TimePicker;

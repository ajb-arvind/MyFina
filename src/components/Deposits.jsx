import * as React from "react";
import {
  Button,
  TextField,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

const handleSubmit = async (event) => {
  event.preventDefault();
};

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];

export default function Deposits() {
  const [type, setType] = React.useState("income");

  const handleAlignment = (event, newType) => {
    setType(newType);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <ToggleButtonGroup
            fullWidth
            value={type}
            color="primary"
            exclusive
            onChange={handleAlignment}
            aria-label="Platform"
          >
            <ToggleButton aria-label="left aligned" value="income">
              Income
            </ToggleButton>
            <ToggleButton aria-label="centered" value="expense">
              Expense
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            name="date"
            autoFocus
            type="date"
          />

          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Account" />}
          />
          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Autocomplete
            fullWidth
            disablePortal
            sx={{ py: 1 }}
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} label="Sub Category" />
            )}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Amount"
            id="amount"
            name="amount"
            autoFocus
            type="number"
            sx={{ my: 1 }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Note"
            id="amount"
            name="amount"
            autoFocus
            type="text"
            sx={{ my: 1 }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Add Transaction
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

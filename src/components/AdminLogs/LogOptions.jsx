import { dark, glassEffect } from "../../themes/MyTheme";
import { Paper, Button, Stack, Box } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LogOptions(onClick) {
  return (
    <Box sx={{ padding: 1, my: 5 }}>
      <Stack
        direction={{ xs: "row", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Always Show Logs"
          />
        </FormGroup>

        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            ...dark,
            "&:hover": { fontWeight: "bold", background: "black" },
            borderRadius: "2px",
            mx: "3px",
          }}>
          Download CSV
        </Button>

        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            ...dark,
            "&:hover": { fontWeight: "bold", background: "black" },
            borderRadius: "2px",
            mx: "3px",
          }}>
          Analyze Data
        </Button>
      </Stack>
    </Box>
  );
}

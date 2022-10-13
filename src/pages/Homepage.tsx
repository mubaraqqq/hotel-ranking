import styled from "@emotion/styled";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  LegendToggleRounded,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { filterCheckedObjects, initializeCheckedObject } from "../utils";
import HotelListItem from "./hotel/HotelListItem";

const Input = styled(TextField)`
  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 7px;
  }
`;

const Homepage = () => {
  const [arrowState, setArrowState] = useState(false);
  const [chainsChecked, setChainsChecked] = useState({});

  const ArrowIcon = arrowState ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

  const chains = [
    "Four seasons",
    "Holiday Inn",
    "7 Eleven",
    "Marriott",
    "6 seasons",
  ];

  let chainsFilter = filterCheckedObjects(chainsChecked);

  const toggleArrowState = () => {
    setArrowState(!arrowState);
  };

  return (
    <main>
      <Grid container>
        <Grid item pt={5} px={2} sm={3}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography>Search</Typography>
              <Input placeholder="Hotel..." />
            </Box>
            <Stack direction="row" onClick={toggleArrowState}>
              <Typography>Filter by Chain</Typography> {ArrowIcon}
            </Stack>
            {arrowState && (
              <Stack direction="column" pl={2}>
                {chains.map((chain) => (
                  <FormControlLabel
                    key={chain}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          setChainsChecked({
                            ...chainsChecked,
                            [chain]: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={chain}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item pt={5} xs={12} sm={9}>
          <section>
            <HotelListItem />
          </section>
        </Grid>
      </Grid>
    </main>
  );
};

export default Homepage;

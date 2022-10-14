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
import { useEffect, useState } from "react";
import { HotelChainRepo, HotelRepo } from "../repositories/hotel-repository";
import { IHotelChainDoc, IHotelDocument } from "../types/types";
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
  const [hotels, setHotels] = useState<IHotelDocument[]>([]);
  const [hotelChains, setHotelChains] = useState<IHotelChainDoc[]>([]);

  const ArrowIcon = arrowState ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

  let chainsFilter = filterCheckedObjects(chainsChecked);
  // console.log(chainsFilter);

  const toggleArrowState = () => {
    setArrowState(!arrowState);
  };

  // Populate Hotel & Hotel Chain arrays on first render
  useEffect(() => {
    (async () => {
      try {
        // set hotel chain list
        const { docList: chainList } = await HotelChainRepo.getHotelChains();
        if (chainList) setHotelChains(chainList);

        // set hotel list
        const { docList: hotelList } = await HotelRepo.getHotels();
        if (hotelList) setHotels(hotelList);
      } catch (e) {}
    })();
  }, []);

  async function deleteHotel(hotel: IHotelDocument) {
    setHotels((hotels) => hotels.filter((el) => el.hotelId !== hotel.hotelId));
    try {
      const { status, errorMessage, successMessage } =
        await HotelRepo.deleteHotel(hotel.hotelId);
      if (status === "success") alert(successMessage);
      else alert(errorMessage);
    } catch (e) {}
  }

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
                {hotelChains.map((chain) => (
                  <FormControlLabel
                    key={chain.chainId}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          setChainsChecked({
                            ...chainsChecked,
                            [chain.name]: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={chain.name}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item pt={5} xs={12} sm={9}>
          <section>
            <Stack direction="column" alignItems="center" spacing={1}>
              {hotels.map((hotel) => (
                <HotelListItem
                  key={hotel.hotelId}
                  hotel={hotel}
                  deleteFn={deleteHotel}
                />
              ))}
            </Stack>
          </section>
        </Grid>
      </Grid>
    </main>
  );
};

export default Homepage;

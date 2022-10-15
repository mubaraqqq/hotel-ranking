import styled from "@emotion/styled";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
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
import { filterCheckedObjects } from "../utils";
import HotelListItem from "../components/hotel/HotelListItem";
import { Button } from "@mui/material";
import { ADD_HOTEL } from "../routes/route";
import { useNavigate } from "react-router-dom";

const Input = styled(TextField)`
  display: block;
  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 7px;
  }
`;

const Homepage = () => {
  const navigate = useNavigate();
  const [arrowState, setArrowState] = useState(false);
  const [chainsChecked, setChainsChecked] = useState({});
  const [hotels, setHotels] = useState<IHotelDocument[]>();
  const [filteredHotels, setFilteredHotels] = useState<IHotelDocument[] | null>(
    null
  );
  const [hotelChains, setHotelChains] = useState<IHotelChainDoc[]>();
  const [searchParams, setSearchParams] = useState("");

  const ArrowIcon = arrowState ? <KeyboardArrowUp /> : <KeyboardArrowDown />;

  let chainsFilter = filterCheckedObjects(chainsChecked);
  // console.log(chainsFilter);

  // let filteredHotels: IHotelDocument[] | null = [];

  const toggleArrowState = () => {
    setArrowState(!arrowState);
  };

  // Populate Hotel & Hotel Chain arrays on first render
  useEffect(() => {
    (async () => {
      try {
        // set hotel chain list
        const { docList: chainList } = await HotelChainRepo.getHotelChains();
        setHotelChains(chainList);

        // set hotel list
        const { docList: hotelList } = await HotelRepo.getHotels();
        setHotels(hotelList);
      } catch (e) {}
    })();
  }, []);

  async function deleteHotel(hotel: IHotelDocument) {
    setHotels(
      (hotels) => hotels && hotels.filter((el) => el.hotelId !== hotel.hotelId)
    );
    try {
      const { status, errorMessage, successMessage } =
        await HotelRepo.deleteHotel(hotel.hotelId);
      if (status === "success") alert(successMessage);
      else alert(errorMessage);
    } catch (e) {}
  }

  function applyFilters() {
    if (hotels) {
      setFilteredHotels(
        hotels.filter((hotel) => {
          if (
            searchParams &&
            hotel.name.toLowerCase().includes(searchParams.toLowerCase())
          )
            return true;
          else if (
            chainsFilter.length > 0 &&
            chainsFilter.includes(hotel.hotelChain)
          )
            return true;
          else if (
            searchParams &&
            chainsFilter.length > 0 &&
            hotel.name.toLowerCase().includes(searchParams.toLowerCase()) &&
            chainsFilter.includes(hotel.hotelChain)
          )
            return true;
          else return false;
        })
      );
    }
    return;
  }

  function clearFilters() {
    setFilteredHotels(null);
    chainsFilter = [];
    setSearchParams("");
  }

  const displayedHotels = filteredHotels || hotels;

  return (
    <main>
      <Typography textAlign="center" pt={2} variant="h5">
        Hotels
      </Typography>
      <Stack direction="column" p="20px" spacing={5}>
        <div>
          <Button variant="outlined" onClick={() => navigate(`/${ADD_HOTEL}`)}>
            Add Hotel
          </Button>
        </div>
        <Grid container>
          <Grid item sm={3}>
            <Stack direction="column" spacing={2}>
              <Box>
                <Typography>Search</Typography>
                <Input
                  placeholder="Hotel Name..."
                  value={searchParams}
                  onChange={(e) => setSearchParams(e.target.value)}
                />
                <Button
                  sx={{ textTransform: "capitalize" }}
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </Box>
              <Stack direction="row" onClick={toggleArrowState}>
                <Typography>Filter by Chain</Typography> {ArrowIcon}
              </Stack>
              {arrowState && hotelChains && (
                <Stack direction="column" pl={2}>
                  {hotelChains.map((chain) => (
                    <FormControlLabel
                      key={chain.chainId}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            setChainsChecked({
                              ...chainsChecked,
                              [chain.chainId]: e.target.checked,
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
          <Grid item xs={12} sm={9}>
            <section>
              <Stack
                direction="column"
                pt="20px"
                alignItems="center"
                spacing={1}
              >
                {hotels && hotels.length > 0 && displayedHotels ? (
                  displayedHotels.map((hotel) => (
                    <HotelListItem
                      key={hotel.hotelId}
                      hotel={hotel}
                      deleteFn={deleteHotel}
                    />
                  ))
                ) : (
                  <p style={{ padding: "20px 0" }}>No hotels found</p>
                )}
              </Stack>
            </section>
          </Grid>
        </Grid>
      </Stack>
    </main>
  );
};

export default Homepage;

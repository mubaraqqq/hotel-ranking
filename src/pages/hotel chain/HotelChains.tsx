import { Button, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelChainListItem from "../../components/hotel chain/HotelChainListItem";
import { HotelChainRepo } from "../../repositories/hotel-repository";
import { ADD_CHAIN } from "../../routes/route";
import { IHotelChainDoc } from "../../types/types";

const HotelChains = () => {
  const navigate = useNavigate();
  const [hotelChains, setHotelChains] = useState<IHotelChainDoc[]>();

  // Populate Hotel & Hotel Chain arrays on first render
  useEffect(() => {
    (async () => {
      try {
        // set hotel chain list
        const { docList: chainList } = await HotelChainRepo.getHotelChains();
        setHotelChains(chainList);
      } catch (e) {}
    })();
  }, []);

  //   delete hotel chain function
  async function deleteHotelChain(hotelChain: IHotelChainDoc) {
    setHotelChains((chains) => {
      if (chains)
        return chains.filter((el) => el.chainId !== hotelChain.chainId);
    });
    try {
      const { status, errorMessage, successMessage } =
        await HotelChainRepo.deleteHotelChain(hotelChain.chainId);
      if (status === "success") alert(successMessage);
      else alert(errorMessage);
    } catch (e) {}
  }

  return (
    <Stack direction="column" px="20px" pt={2} spacing={2}>
      <Typography textAlign="center" pt={2} variant="h5">
        Hotel Chains
      </Typography>
      <div>
        <Button variant="outlined" onClick={() => navigate(`/${ADD_CHAIN}`)}>
          Add Hotel Chain
        </Button>
      </div>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 1 }}>
        {hotelChains && hotelChains.length > 0 ? (
          hotelChains.map((chain) => (
            <Grid key={chain.chainId} item xs={12} sm={6} md={4}>
              <HotelChainListItem
                hotelChain={chain}
                deleteFn={deleteHotelChain}
              />
            </Grid>
          ))
        ) : (
          <p>No Hotel Chains Found</p>
        )}
      </Grid>
    </Stack>
  );
};

export default HotelChains;

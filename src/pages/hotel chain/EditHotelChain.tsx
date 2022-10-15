import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelChainForm from "../../components/hotel chain/HotelChainForm";
import { HotelChainRepo } from "../../repositories/hotel-repository";
import { IHotelChainDoc } from "../../types/types";

const EditHotelChain = () => {
  const { chainId } = useParams();
  const [hotelChain, setHotelChain] = useState<IHotelChainDoc>();

  useEffect(() => {
    if (chainId) {
      (async () => {
        try {
          const { doc } = await HotelChainRepo.getHotelChain(chainId);
          setHotelChain(doc);
        } catch (e) {}
      })();
    }
  }, [chainId]);

  return (
    <>
      <Typography textAlign="center" pt={2} variant="h5">
        Edit Hotel Chain
      </Typography>
      {hotelChain ? (
        <>
          <HotelChainForm hotelChainToEdit={hotelChain} />
        </>
      ) : (
        <h3>No Hotel Chain found</h3>
      )}
    </>
  );
};

export default EditHotelChain;

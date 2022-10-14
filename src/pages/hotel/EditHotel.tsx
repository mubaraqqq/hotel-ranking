import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelForm from "../../components/hotel/HotelForm";
import { HotelRepo } from "../../repositories/hotel-repository";
import { IHotelDocument } from "../../types/types";

const EditHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<IHotelDocument>();

  useEffect(() => {
    if (hotelId) {
      (async () => {
        try {
          const { doc } = await HotelRepo.getHotel(hotelId);
          setHotel(doc);
        } catch (e) {}
      })();
    }
  }, [hotelId]);

  return (
    <>
      <Typography textAlign="center" pt={2} variant="h5">
        Edit Hotel
      </Typography>
      {hotel ? (
        <>
          <HotelForm hotelToEdit={hotel} />
        </>
      ) : (
        <h3>Hotel Not Found</h3>
      )}
    </>
  );
};

export default EditHotel;

import { Typography } from "@mui/material";
import HotelForm from "../../components/hotel/HotelForm";

const AddHotel = () => {
  return (
    <>
      <Typography textAlign="center" pt={2} variant="h5">
        Create Hotel
      </Typography>
      <HotelForm />
    </>
  );
};

export default AddHotel;

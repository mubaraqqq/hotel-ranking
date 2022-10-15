import Typography from "@mui/material/Typography";
import HotelChainForm from "../../components/hotel chain/HotelChainForm";

const AddHotelChain = () => {
  return (
    <>
      <Typography textAlign="center" pt={2} variant="h5">
        Create Hotel Chain
      </Typography>
      <HotelChainForm />
    </>
  );
};

export default AddHotelChain;

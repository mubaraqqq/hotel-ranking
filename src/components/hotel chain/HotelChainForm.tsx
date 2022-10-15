import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelChainRepo } from "../../repositories/hotel-repository";
import { HOTEL_CHAINS } from "../../routes/route";
import { IHotelChainDoc } from "../../types/types";

type HotelChainFormProps = {
  hotelChainToEdit?: IHotelChainDoc;
};

const hotelChainFormInitalValues = {
  name: "",
  hq: "",
  chainId: "",
};

const HotelChainForm = ({ hotelChainToEdit }: HotelChainFormProps) => {
  const [loading, setLoading] = useState(false);

  //  boolean variable to determine if the form is for editing or creation of a hotel chain document
  const isEditForm = !!hotelChainToEdit;

  //   Set form initial values to empty object or prefilled hotel chain properties depending on whether or not isEditForm is true
  const [hotelChain, setHotelChain] = useState(
    isEditForm ? hotelChainToEdit : hotelChainFormInitalValues
  );

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(async () => {
        if (isEditForm) {
          const { status, successMessage, errorMessage } =
            await HotelChainRepo.editHotelChain({
              name: hotelChain.name,
              hq: hotelChain.hq,
              chainId: hotelChain.chainId,
            });
          if (status === "success") alert(successMessage);
          else alert(errorMessage);
        } else {
          const { status, successMessage, errorMessage } =
            await HotelChainRepo.createHotelChain({
              name: hotelChain.name,
              hq: hotelChain.hq,
            });
          if (status === "success") alert(successMessage);
          else alert(errorMessage);
        }
      }, 1500);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setHotelChain(hotelChainFormInitalValues);
        setTimeout(() => {
          navigate(`/${HOTEL_CHAINS}`);
        }, 1000);
      }, 1500);
    }
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      pt={5}
      spacing={5}
      sx={{
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          minHeight: "400px",
          width: { xs: "90%", sm: "40%" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3}>
            <TextField
              label="Chain Name"
              value={hotelChain.name}
              onChange={(e) =>
                setHotelChain({ ...hotelChain, name: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Headquarters Address"
              value={hotelChain.hq}
              onChange={(e) =>
                setHotelChain({ ...hotelChain, hq: e.target.value })
              }
              required
              fullWidth
            />
            <Box width="50%">
              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                variant="contained"
              >
                {isEditForm ? "Edit Chain" : "Submit"}
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default HotelChainForm;

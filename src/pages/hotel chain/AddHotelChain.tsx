import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelChainRepo } from "../../repositories/hotel-repository";

const AddHotelChain = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [hq, setHq] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(async () => {
        const { status, successMessage, errorMessage } =
          await HotelChainRepo.createHotelChain({ name: name, hq: hq });
        if (status === "success") alert(successMessage);
        else alert(errorMessage);
      }, 1500);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setName("");
        setHq("");
        setTimeout(() => {
          navigate("/");
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
      <Typography variant="h5">Create Hotel Chain</Typography>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Headquarters Address"
              value={hq}
              onChange={(e) => setHq(e.target.value)}
              required
              fullWidth
            />
            <Box width="50%">
              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default AddHotelChain;

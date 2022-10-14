import { Edit, Delete } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelChainRepo } from "../../repositories/hotel-repository";
import { EDIT_HOTEL } from "../../routes/route";
import { IHotelDocument } from "../../types/types";

type Props = {
  hotel: IHotelDocument;
  deleteFn: (hotel: IHotelDocument) => void;
};

const HotelListItem = ({ hotel, deleteFn }: Props) => {
  const [hotelChainName, setHotelChainName] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { doc } = await HotelChainRepo.getHotelChain(hotel.hotelChain);
        if (doc) setHotelChainName(doc.name);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [hotel.hotelChain]);

  return (
    <Card sx={{ width: "95%", height: "80px", mx: "auto" }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column">
            <Typography fontWeight="700" sx={{ wordWrap: "break-word" }}>
              {hotel.name}
            </Typography>
            <Typography variant="caption" textTransform="capitalize">
              {hotel.city}, {hotel.country}
            </Typography>
          </Stack>
          <Chip
            label={
              <Typography
                fontSize={{ xs: "8px", sm: "15px" }}
                variant="caption"
              >
                {hotelChainName}
              </Typography>
            }
          />
          <Stack direction="row" spacing={0}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`${EDIT_HOTEL}/${hotel.hotelId}`)}
              >
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteFn(hotel)}>
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HotelListItem;

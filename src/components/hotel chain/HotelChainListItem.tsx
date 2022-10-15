import { Edit, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EDIT_CHAIN } from "../../routes/route";
import { IHotelChainDoc } from "../../types/types";

type HotelChainListItemProps = {
  hotelChain: IHotelChainDoc;
  deleteFn: (hotelChain: IHotelChainDoc) => void;
};

const HotelChainListItem = ({
  hotelChain,
  deleteFn,
}: HotelChainListItemProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" textTransform="capitalize">
            {hotelChain.name}
          </Typography>
          <Stack direction="row" spacing={0}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/${EDIT_CHAIN}/${hotelChain.chainId}`)}
              >
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteFn(hotelChain)}>
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Typography variant="caption">{hotelChain.hq}</Typography>
      </CardContent>
    </Card>
  );
};

export default HotelChainListItem;

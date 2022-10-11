import { Edit, Delete } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IHotelDocument } from "../../types/types";

type Props = {
  hotel: IHotelDocument;
};

const HotelListItem = () => {
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
              Four Seasons
            </Typography>
            <Typography variant="caption">Idaho, Utah</Typography>
          </Stack>
          <Chip
            label={
              <Typography fontSize="8px" variant="caption">
                Four Seasons Chain
              </Typography>
            }
          />
          <Stack direction="row" spacing={0}>
            <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
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

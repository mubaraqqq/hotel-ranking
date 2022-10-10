import { AddBox, AddBusiness } from "@mui/icons-material";
import { ADD_CHAIN, ADD_HOTEL } from "../routes/route";

export const APP_NAME = "Hotel Ranking";

export const db = {
  HOTEL: "hotel",
  HOTEL_CHAIN: "hotel-chain",
};

export const navLinks = [
  {
    link: ADD_CHAIN,
    text: `Create Chain`,
    icon: <AddBox />,
  },
  {
    link: ADD_HOTEL,
    text: `Create Hotel `,
    icon: <AddBusiness />,
  },
];
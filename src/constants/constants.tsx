import { AddBox, AddBusiness, Business, Home } from "@mui/icons-material";
import { ADD_CHAIN, ADD_HOTEL, HOTEL_CHAINS } from "../routes/route";

export const APP_NAME = "Hotel Ranking";

export const db = {
  HOTEL: "hotel",
  HOTEL_CHAIN: "hotel-chain",
};

export const navLinks = [
  {
    link: "/",
    text: "Home",
    icon: <Home />,
  },
  {
    link: ADD_HOTEL,
    text: `Create Hotel `,
    icon: <AddBusiness />,
  },
  {
    link: ADD_CHAIN,
    text: `Create Chain`,
    icon: <AddBox />,
  },
  {
    link: HOTEL_CHAINS,
    text: "Hotel Chains",
    icon: <Business />,
  },
];

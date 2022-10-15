import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import AddHotelChain from "./pages/hotel chain/AddHotelChain";
import EditHotelChain from "./pages/hotel chain/EditHotelChain";
import HotelChains from "./pages/hotel chain/HotelChains";
import AddHotel from "./pages/hotel/AddHotel";
import EditHotel from "./pages/hotel/EditHotel";
import Hotel from "./pages/hotel/Hotel";
import {
  ADD_CHAIN,
  ADD_HOTEL,
  EDIT_CHAIN,
  EDIT_HOTEL,
  HOTEL,
  HOTEL_CHAINS,
} from "./routes/route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={`${HOTEL}/:hotelId`} element={<Hotel />} />
        <Route path={ADD_HOTEL} element={<AddHotel />} />
        <Route path={`${EDIT_HOTEL}/:hotelId`} element={<EditHotel />} />
        <Route path={HOTEL_CHAINS} element={<HotelChains />} />
        <Route path={ADD_CHAIN} element={<AddHotelChain />} />
        <Route path={`${EDIT_CHAIN}/:chainId`} element={<EditHotelChain />} />
      </Route>
    </Routes>
  );
}

export default App;

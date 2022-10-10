import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import AddHotelChain from "./pages/hotel chain/AddHotelChain";
import EditHotelChain from "./pages/hotel chain/EditHotelChain";
import AddHotel from "./pages/hotel/AddHotel";
import EditHotel from "./pages/hotel/EditHotel";
import { ADD_CHAIN, ADD_HOTEL, EDIT_CHAIN, EDIT_HOTEL } from "./routes/route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path={ADD_HOTEL} element={<AddHotel />} />
        <Route path={`${EDIT_HOTEL}/:hotelId`} element={<EditHotel />} />
        <Route path={ADD_CHAIN} element={<AddHotelChain />} />
        <Route path={`${EDIT_CHAIN}/:chainId`} element={<EditHotelChain />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Stack, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import { HotelChainRepo, HotelRepo } from "../../repositories/hotel-repository";
import { IHotelChainDoc, IHotelDocument } from "../../types/types";

import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Hotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<IHotelDocument>();
  const [hotelChain, setHotelChain] = useState<IHotelChainDoc>();
  const hotelChainId = hotel && hotel.hotelChain;

  useEffect(() => {
    if (hotelChainId) {
      (async () => {
        try {
          const { doc } = await HotelChainRepo.getHotelChain(hotelChainId);
          setHotelChain(doc);
        } catch (e) {}
      })();
    }
  }, [hotelChainId]);

  useEffect(() => {
    if (hotelId) {
      (async () => {
        try {
          const { doc } = await HotelRepo.getHotel(hotelId);
          setHotel(doc);
        } catch (e) {}
      })();
    }
  }, [hotelId]);

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <>
      <Typography
        textAlign="center"
        pt={2}
        variant="h5"
        textTransform="capitalize"
      >
        Hotel - {hotel.name}
      </Typography>
      <Stack
        direction="column"
        alignItems="center"
        py={5}
        spacing={5}
        sx={{
          minHeight: "80vh",
        }}
      >
        <Box
          sx={{
            minHeight: "400px",
            width: { xs: "90%", sm: "40%" },
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        >
          <Stack direction="column" spacing={3}>
            <Typography>Hotel Name - {hotel.name}</Typography>
            <Typography>Hotel City - {hotel.city} </Typography>
            <Typography>Hotel Country - {hotel.country}</Typography>
            <Typography>
              {hotelChain
                ? `Hotel Chain - ${hotelChain.name}`
                : "Could not find hotel chain for this hotel"}
            </Typography>
            <Typography>Hotel Address - {hotel.address}</Typography>

            <div style={{ height: "500px", width: "100%" }}>
              <MapContainer
                center={hotel.latlng}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={hotel.latlng}>
                  <Popup>
                    <Typography>{hotel.name}</Typography>
                    <Typography>{hotel.address}</Typography>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Hotel;

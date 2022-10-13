import { LoadingButton } from "@mui/lab";
import {
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState, FormEvent, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { HotelChainRepo, HotelRepo } from "../../repositories/hotel-repository";
import { LatLngLiteral, LeafletMouseEvent } from "leaflet";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { IHotelChainDoc, IHotelInput } from "../../types/types";
import { generateUUID } from "../../utils";
import axios from "axios";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const mapCenter: LatLngLiteral = { lat: 6.457171, lng: 3.327709 };
// [6.457171, 3.327709];
const hotelFormInitialValues = {
  name: "",
  city: "",
  country: "",
  address: "",
  latlng: mapCenter,
  hotelChain: "",
};

const AddHotel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState<IHotelInput>(hotelFormInitialValues);
  const [hotelChains, setHotelChains] = useState<IHotelChainDoc[]>([]);
  const [mapLocation, setMapLocation] = useState<LatLngLiteral>(mapCenter);
  const [geocodedAddress, setGeocodedAddress] = useState<string>();

  const noHotelChains = hotelChains.length === 0;
  const hotelChainSelectLabel = noHotelChains
    ? "No Hotel Chains Added Yet"
    : "Hotel Chain";

  // Submit form function
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(async () => {
        const { status, successMessage, errorMessage } =
          await HotelRepo.createHotel({
            name: hotel.name,
            city: hotel.city,
            country: hotel.country,
            address: hotel.address,
            latlng: hotel.latlng,
            hotelChain: hotel.hotelChain,
          });
        if (status === "success") alert(successMessage);
        else alert(errorMessage);
      }, 1500);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setHotel(hotelFormInitialValues);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }, 1500);
    }
  }

  // Leaflet Map Child Component and Events
  function MapFunction() {
    const map = useMapEvents({
      click: (e: LeafletMouseEvent) => {
        map.locate();
        setMapLocation(e.latlng);
        setHotel({ ...hotel, latlng: e.latlng });
      },
    });
    return null;
  }

  function handleHotelChainChange(e: SelectChangeEvent) {
    setHotel({ ...hotel, hotelChain: e.target.value });
  }

  // Get Hotel Chains from database and load them into select input
  useEffect(() => {
    (async () => {
      try {
        const { docList } = await HotelChainRepo.getHotelChains();
        if (docList) {
          setHotelChains(docList);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // Get street address from map longitude and latitude coordinates using API
  useEffect(() => {
    // API options
    const options = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat: mapLocation.lat,
        lon: mapLocation.lng,
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_GEOCODING_API_KEY,
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // Set hotel address to geocoding response from API
        setHotel((hotel) => ({
          ...hotel,
          address: response.data.display_name,
        }));
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [mapLocation]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      py={5}
      spacing={5}
      sx={{
        minHeight: "80vh",
      }}
    >
      <Typography variant="h5">Create Hotel</Typography>
      <Box
        sx={{
          minHeight: "400px",
          width: { xs: "90%", sm: "40%" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3}>
            <TextField
              label="Hotel Name"
              value={hotel.name}
              onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="City"
              value={hotel.city}
              onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Country"
              value={hotel.country}
              onChange={(e) => setHotel({ ...hotel, country: e.target.value })}
              required
              fullWidth
            />
            <FormControl fullWidth disabled={noHotelChains}>
              <InputLabel id="demo-simple-select-label">
                {hotelChainSelectLabel}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hotel.hotelChain}
                label={hotelChainSelectLabel}
                onChange={handleHotelChainChange}
              >
                {hotelChains.map((chain) => (
                  <MenuItem key={generateUUID()} value={chain.chainId}>
                    {chain.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Address"
              value={hotel.address}
              required
              fullWidth
            />

            <Typography>Select Hotel Location on Map</Typography>
            <div style={{ height: "500px", width: "100%" }}>
              <MapContainer
                center={mapCenter}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapFunction />
                <Marker position={mapLocation}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <Box py={1} width="50%">
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

export default AddHotel;

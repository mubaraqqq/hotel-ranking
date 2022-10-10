import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/icons8-hotel-building-100.png";

type LogoProps = {
  width?: string;
  height?: string;
  link?: boolean;
};

const Logo = ({ width, height, link }: LogoProps) => {
  const matchSmallScreen = useMediaQuery("(max-width: 600px)");

  const defaultWidth = matchSmallScreen ? "50" : "75";

  const img = (
    <img
      src={logo}
      alt="hotel ranking logo"
      width={width || defaultWidth}
      height={height || defaultWidth}
    />
  );

  if (link) return <Link to="/">{img}</Link>;

  return <div>{img}</div>;
};

export default Logo;

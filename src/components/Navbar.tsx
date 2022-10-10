import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";
import Logo from "./Logo";
import { APP_NAME, navLinks } from "../constants/constants";
import { Divider, Drawer } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LinkText = styled(Typography)`
  border-bottom: 2px solid transparent;
  :hover,
  :active {
    border-bottom: 2px solid white;
  }
`;

const NavBar = () => {
  const [anchorState, setAnchorState] = useState(false);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorState(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorState(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display={{ xs: "none", sm: "flex" }}>
            <Logo link />
          </Box>
          <StyledLink to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              {APP_NAME}
            </Typography>
          </StyledLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              sx={{ display: { xs: "flex", sm: "none" } }}
              anchor="left"
              open={anchorState}
              onClose={handleCloseNavMenu}
            >
              <Box width="70vw" pt={5}>
                <Box
                  sx={{ display: "flex", justifyContent: "center" }}
                  onClick={handleCloseNavMenu}
                >
                  <Logo link height="100" width="100" />
                </Box>
                <Divider />
                {navLinks.map((link) => (
                  <MenuItem key={link.text} onClick={handleCloseNavMenu}>
                    <StyledLink to={link.link}>
                      <Typography color="black" textAlign="center">
                        {link.text}
                      </Typography>
                    </StyledLink>
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
            <Logo link />
          </Box>
          <StyledLink to="/">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", sm: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              {APP_NAME}
            </Typography>
          </StyledLink>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              ml: "40px",
            }}
          >
            {navLinks.map((link) => (
              <StyledLink
                key={link.text}
                to={link.link}
                onClick={handleCloseNavMenu}
              >
                <LinkText sx={{ marginRight: "30px" }} color="white">
                  {link.text}
                </LinkText>
              </StyledLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

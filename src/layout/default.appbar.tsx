import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser, logout } from "../user/userSlice";
import type { LinkProps } from "react-router-dom";

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ backgroundColor: match ? "primary.main" : "brandBlack.main", p: 2 }}
    >
      <Link
        style={{ textDecoration: "none", color: "#FFF" }}
        to={to}
        {...props}
      >
        <Typography variant="body1">{children}</Typography>
      </Link>
    </Box>
  );
}

const navigation = [
  {
    link: "/",
    title: "Home",
  },
  // {
  //   link: "/assessments",
  //   title: "Assessments",
  // },
  // {
  //   link: "/faq",
  //   title: "FAQ",
  // },
  // {
  //   link: "/manage",
  //   title: "Manage",
  // },
];

const pages = ["Home"];
const settings = ["Settings", "Logout"];

export const DefaultAppBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action = "") => {
    switch (action) {
      case "Logout":
        dispatch(logout());
        break;
      default:
        break;
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "brandBlack.main" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            variant="square"
          >
            <img src="/Small_Logo_RGB.svg" alt="OBS Small Logo" />
          </Avatar>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              height: "64px",
            }}
          >
            {navigation.map(({ title, link }) => (
              <CustomLink to={link}>{title}</CustomLink>
            ))}

            {/* {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user.name || "Avatar"}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

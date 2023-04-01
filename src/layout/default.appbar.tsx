import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import type { LinkProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser } from "../user/userSlice";
import { alpha, InputBase, styled, TextField } from "@mui/material";

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
    link: "/mais-ensino",
    title: "Início",
  },
  {
    link: "/mais-ensino/disciplinas",
    title: "Disciplinas",
  },
  {
    link: "/mais-ensino/comentarios",
    title: "Comentários",
  },
  {
    link: "/mais-ensino/relatorios",
    title: "Relatórios",
  },
  {
    link: "/mais-ensino/gerenciamento",
    title: "Gerenciamento",
  },
];

const pages = [
  "Início",
  "Áreas de Conhecimento",
  "Disciplinas",
  "Comentários",
  "Relatórios",
];
const settings = ["Configurações", "Sair"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const DefaultAppBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME!);
    navigate("/");
  };

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (action = "") => {
    switch (action) {
      case "Sair":
        handleLogout();
        break;
      default:
        break;
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action = "") => {
    switch (action) {
      case "Sair":
        handleLogout();
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
          <Typography
            variant="h5"
            noWrap
            component="div"
            color="action.selected"
            fontWeight={700}
            letterSpacing={1.2}
            sx={{ display: { xs: "none", lg: "flex" } }}
            mr={5}
          >
            <span style={{ color: "#39C0BA" }}>+</span>ENSINO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
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
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", lg: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="action.selected"
            fontWeight={700}
            letterSpacing={1.2}
            sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}
          >
            <span style={{ color: "#39C0BA" }}>+</span>ENSINO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              height: "64px",
            }}
          >
            {navigation.map(({ title, link }) => (
              <CustomLink to={link}>{title}</CustomLink>
            ))}
          </Box>

          {/* //TODO search bar */}
          {/* <Box sx={{ flexGrow: 0 }} mx={5} width="100%">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Pesquisar..."
                inputProps={{ "aria-label": "pesquisar" }}
              />
            </Search>
          </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
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

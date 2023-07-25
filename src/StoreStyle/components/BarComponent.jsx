import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { InputComponent } from "./InputComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { setFilterCategory } from "../../store/StoreStyle/storeSlice";
import { MenuButton } from "../../theme/sxStyles";
import { useState } from "react";

const pages = ["Women", "Men", "Children"];

export const BarComponent = () => {
  const { displayName, uid, status } = useSelector((state) => state.auth);
  const { filterCategory } = useSelector( (state) => state.store);
  const { articlesCount } = useSelector((state) => state.checkout);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleCategoryOnCLick = (category) => {
    dispatch(setFilterCategory(category.toLowerCase()));
  };

  const handleOnClickCart = () => {
    if (status === 'authenticated') {
      navigate('/checkout');
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "grey",
              textDecoration: "none",
            }}
          >
            StyleStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="dark"
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
                <MenuItem
                  key={page}
                  onClick={() => handleCategoryOnCLick(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "grey",
              textDecoration: "none",
            }}
          >
            StyleStore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button 
              style={{
                backgroundColor: filterCategory === 'women' ? '#DBDDDE' : 'white',
              }}
              onClick={() => handleCategoryOnCLick("women")}
              sx={ MenuButton}>
              WOMEN
            </Button>

            <Button 
              style={{
                backgroundColor: filterCategory === 'men' ? '#DBDDDE' : 'white',
              }}
              onClick={() => handleCategoryOnCLick("men")}
              sx={ MenuButton}>
              MEN
            </Button>

            <Button 
              style={{
                backgroundColor: filterCategory === 'children' ? '#DBDDDE' : 'white',
              }}
              onClick={() => handleCategoryOnCLick("children")}
              sx={ MenuButton}>
              CHILDREN
            </Button>

            <InputComponent />
          </Box>

          <Typography>{displayName}</Typography>
          {uid === import.meta.env.VITE_ADMIN_ID && (
            <IconButton onClick={() => navigate("/dashboard")}>
              <DashboardCustomizeIcon fontSize="large" />
            </IconButton>
          )}

          <IconButton aria-label="cart" onClick={() => handleOnClickCart()}>
            <StyledBadge badgeContent={articlesCount} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open login">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 3 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>

            {status !== "authenticated" ? (
              <Menu
                sx={{ mt: "10px" }}
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
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate("/auth/login")}>
                  Sign In
                </MenuItem>
                <MenuItem onClick={() => navigate("/auth/register")}>
                  Sign Up Now
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "10px" }}
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
                onClose={handleCloseUserMenu}
              >
                {" "}
                <MenuItem onClick={onLogout}>Logout</MenuItem>{" "}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default BarComponent;

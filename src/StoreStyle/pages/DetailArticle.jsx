import { Box, Button, Divider, Typography } from "@mui/material";
import { BarDashboard } from "../components/BarDashboard";
import { PrimaryButton } from "../../theme/sxStyles";
import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { startSaveCheckoutArticle } from "../../store/checkout/thunks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const DetailArticle = () => {
  const { selected: selectedArticle } = useSelector((state) => state.checkout);
  const { title, description, price, imageUrls } = selectedArticle || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAddToCartButton, setShowAddToCartButton] = useState(true);

  const onAddToCart = () => {
    Swal.fire({  
      position: 'center',
      icon: 'success',
      title: 'Article Added to Cart',
      showConfirmButton: false,
      timer: 1500,  
  });  
    dispatch(startSaveCheckoutArticle());
    setShowAddToCartButton(false);
  };
  return (
    <Box>
      <BarDashboard />

      {!selectedArticle ? (
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            height: "400px",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <h1>Oops nothing to see here.</h1>
          <Button
            sx={{
              backgroundColor: "gray",
              width: "200px",
              ":hover": { color: "black" },
            }}
            onClick={() => navigate("/home")}
          >
            Home
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={15}
          mx={20}
          padding={1}
          gap={2}
        >
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box sx={{ width: "40%", overflow: "auto",  }}>
              <Box
                sx={{ display: "flex", flexDirection: "row", width: "2500px", gap: 3 }}
              >
                {imageUrls.length > 0 && (
                  <>
                    {imageUrls.map((image, i) => (
                      <div key={i}>
                        <img src={image} alt={title} height="340px" />
                      </div>
                    ))}
                  </>
                )}
              </Box>
            </Box>
            <Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1}
                width="100%"
              >
                <Box display="flex" flexDirection="column" gap={5} width="100%" marginLeft={ 10 }>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Typography
                      sx={{
                        // fontFamily: "monospace",
                        fontWeight: 700,
                        color: "#5F6A6A",
                      }}
                    >
                      Product
                    </Typography>
                    <ChevronRightIcon />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        // fontFamily: "monospace",
                        fontSize: 30,
                        color: "black",
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        // fontFamily: "monospace",
                        color: "#5F6A6A",
                      }}
                    >
                      Price
                    </Typography>
                    <ChevronRightIcon />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        // fontFamily: "monospace",
                        fontSize: 30,
                        color: "black",
                      }}
                    >
                      ${price}
                    </Typography>
                  </Box>
                </Box>
                <Divider/>
                <Box
                  sx={{
                    fontWeight: 500,
                    // fontFamily: "monospace",
                    fontSize: 20,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    maxHeight: "230px",
                    marginLeft: 10,
                    color: "grey",
                  }}
                >
                  {description}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
          >
            {showAddToCartButton === true ? (
              <Button
                sx={PrimaryButton}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "153px",
                }}
                onClick={() => onAddToCart()}
                disabled={ selectedArticle.stock == 0 }
              >
                {selectedArticle.stock == 0 ? 'Out of stock' : 'Add to Cart' } <ShoppingCartIcon />
              </Button>
            ) : (
              <Button
                sx={PrimaryButton}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "153px",
                }}
                onClick={() => navigate("/checkout")}
              >
                Go to Cart <ShoppingCartIcon />
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

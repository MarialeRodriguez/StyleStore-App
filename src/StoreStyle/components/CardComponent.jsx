import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { PrimaryButton } from "../../theme/sxStyles";
import { setSelectedArticle } from "../../store/StoreStyle/storeSlice";
import { setSelectedCheckoutArticle } from "../../store/checkout/checkoutSlice";
import { amountFormatter } from "../../helpers/amountFormatter";

export const CardComponent = ({ title, description, price, imageUrls, id, category, quantity, stock, tax, id: referenceId }) => {

  const newDescription = useMemo(() => {
    return description.length > 20
      ? description.substring(0, 17) + "..."
      : description;
  }, [description]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClickDetail = () => {
    navigate('/article-detail');

    dispatch( setSelectedArticle({ title, description, price, imageUrls, id, category, stock, quantity, tax }) );
    dispatch( setSelectedCheckoutArticle({ title, description, price, imageUrls, category, stock, quantity, tax, referenceId }) );

  };

  const newTitle = useMemo(() => {
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  }, [title]);


  return (
    <Card sx={{ width: 200, height: 400 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={imageUrls?.length > 0 ? imageUrls[0] : "https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg" }
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" fontWeight={600} component="div" height={100}>
          {newTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newDescription}
        </Typography>
      </CardContent>

      
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
          }}
        >
          {" "}
          <Button
            onClick={ handleOnClickDetail }
            sx={PrimaryButton}
            size="small"
          >
            Detail
          </Button>
          
          {"  "}
          <Typography gutterBottom variant="h5" fontWeight={600} component='div' mt={1.2}>
            {amountFormatter(price)}
          </Typography>
        </Box>

    </Card>
  );
};

import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { useMemo } from "react";
import { setActiveArticle } from "../../store/StoreStyle/storeSlice";
import { useDispatch } from "react-redux";

export const SideBarItem = ({
  id,
  title = "",
  description,
  price,
  category,
  imageUrls = [],
  tax,
  stock,
  quantity,
}) => {
  const dispatch = useDispatch();

  const onClickArticle = () => {
    dispatch(
      setActiveArticle({ id, title, description, price, category, imageUrls, tax, stock, quantity })
    );
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickArticle}>
        <ListItemIcon>
          <LabelImportantIcon />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

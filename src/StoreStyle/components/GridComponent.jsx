import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { CardComponent } from "./CardComponent";
import { setFilteredArticles } from "../../store/StoreStyle/storeSlice";

export const GridComponent = () => {
  const { filterCategory, filteredArticles } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( setFilteredArticles(filterCategory));
  }, [filterCategory])
  

  return (
    <Box sx={{ flexGrow: 1, pt: 20, px: 10, width: '100%', backgroundColor: "white" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 8 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {filteredArticles.map((article, index) => (
          <Grid item key={index}>
            <CardComponent { ...article } />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

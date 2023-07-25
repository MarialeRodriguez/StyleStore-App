import { Box, IconButton, Toolbar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircle";
import { BarDashboard } from "../components/BarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { startNewArticle } from "../../store/StoreStyle/thunks";
import { NothingSelectedView } from "../view/NothingSelectedView";
import { ArticleView } from "../view/ArticleView";
import { SideBar } from "../components/SideBar";

const drawerWidth = 260;

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.store);

  const onClickNewArticle = () => {
    dispatch(startNewArticle());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <BarDashboard drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      <Toolbar />

      <Box sx={{ flexGrow: 1, p: 8 }}>
        {!!active ? <ArticleView /> : <NothingSelectedView />}

        <IconButton
          onClick={onClickNewArticle}
          size="large"
          disabled={isSaving}
          sx={{
            color: "grey",
            backgroundColor: "black",
            ":hover": { backgroundColor: "grey", color: "white" },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

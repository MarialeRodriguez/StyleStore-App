import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  FormControl,
  FilledInput,
  InputAdornment,
} from "@mui/material";
import { ImageArticle } from "../components/imageArticle";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef } from "react";
import { setActiveArticle } from "../../store/StoreStyle/storeSlice";
import {
  startDeletingArticle,
  startSaveArticle,
  startUploadingFiles,
} from "../../store/StoreStyle/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const ArticleView = () => {
  const dispatch = useDispatch();
  const {
    active: article,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.store);

  const {
    title,
    description,
    price,
    category,
    imageUrls,
    quantity,
    tax,
    stock,
    onInputChange,
    formState,
  } = useForm(article);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveArticle(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Article updated", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveArticle = () => {
    dispatch(startSaveArticle());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingArticle());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sw={{ mb: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />

        <IconButton
          color="secondary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveArticle}
          color="secondary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 40, mr: 1 }} />
          Save
        </Button>

        <Button onClick={onDelete} color="error">
          <DeleteOutline />
          Delete
        </Button>
      </Box>

      <Grid
        container
        justifyContent="start"
        alignItems="center"
        sx={{ margin: 1 }}
      >
        <FormControl fullWidth variant="filled" sx={{ border: "none", mb: 1 }}>
          <InputLabel htmlFor="filled-adornment-amount">Title</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={title}
            name="title"
            onChange={onInputChange}
          />
        </FormControl>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Description"
          minRows={4}
          sx={{ border: "none", mb: 1 }}
          name="description"
          value={description}
          onChange={onInputChange}
        />

        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl variant="filled" sx={{ border: "none", mb: 1 }}>
            <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={price}
              name="price"
              onChange={onInputChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="filled" sx={{ border: "none", mb: 1 }}>
            <InputLabel htmlFor="filled-adornment-amount">Stock</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={stock}
              name="stock"
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ border: "none", mb: 1 }}>
            <InputLabel htmlFor="filled-adornment-amount">Tax</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={tax}
              name="tax"
              onChange={onInputChange}
            />
          </FormControl>
        </Box>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
          <Select
            variant="filled"
            fullWidth
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="category"
            value={category}
            onChange={onInputChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value={"women"}>Women</MenuItem>
            <MenuItem value={"men"}>Men</MenuItem>
            <MenuItem value={"children"}>Children</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignContent="center"
        direction="row"
        sx={{ width: "90%", mr: 5 }}
      >
        <ImageArticle images={article.imageUrls} />
      </Grid>
    </Grid>
  );
};

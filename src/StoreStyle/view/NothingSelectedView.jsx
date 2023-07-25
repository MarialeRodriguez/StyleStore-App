import { Grid, Typography } from "@mui/material";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';


export const NothingSelectedView = () => {
  return ( 
    <Grid
        container
        spacing={ 0 }
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '90vh', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
        <Grid item xs={ 12 }>
        <StarOutlineOutlinedIcon sx={{ fontSize: 100, color: 'white' }} />
        </Grid>
        <Grid item xs={ 12 }>
            <Typography color="white" variant="h5">Selecciona o crea un articulo</Typography>
        </Grid>
    </Grid>
  )
}


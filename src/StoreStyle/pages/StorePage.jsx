import { Grid } from "@mui/material"
import { BarComponent } from "../components/BarComponent"
import { GridComponent } from "../components/GridComponent"

export const StorePage = () => {
  return (
    <Grid container spacing={2}>
      <BarComponent/>
      <Grid item>
      <GridComponent/>
      </Grid>
    </Grid>
  )
}

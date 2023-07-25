import { Grid, Typography } from '@mui/material';


export const AuthLayout = ({ children, title = '' }) => {
  return (
    
    <Grid 
        container 
        spacing={ 0 }
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '80vh', padding: 4 }}>
      

      <Grid item
        className="box-shadow"
        xs={ 3 }
        sx={{ 
            width: { md: 450 },
            backgroundColor: '#DCDCDC', 
            padding: 3, 
            borderRadius: 2
            }}>
          <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>{ title }</Typography>

            
            { children }

        </Grid>

    </Grid>

  )
}

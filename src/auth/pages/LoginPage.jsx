import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "./layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
  email: 'maria@gmail.com',
  password: '123456'
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  const { email, password, onInputChange, formState } = useForm( formData );

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = ( event ) => {
    event.preventDefault();

    dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

    return (
    <AuthLayout title="Log In">
          <form onSubmit={ onSubmit }>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Email" 
                  type="email" 
                  placeholder="email@google.com"
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  autoComplete="off"
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  />
              </Grid>

              <Grid 
                container 
                display={ !!errorMessage ? '': 'none'}
                sx={{ mt: 1 }}>
              <Grid 
                item 
                xs={ 12 }
                
                >
                  <Alert severity="error">{ errorMessage }</Alert>
                </Grid>

              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 2 }}>
                <Grid item xs={ 12 } md={ 6 }>
                  <Button 
                    disabled={ isAuthenticating }
                    type="submit" 
                    variant="container" 
                    fullWidth 
                    sx={{ backgroundColor: '#919191'}}
                    >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={ 12 } md={ 6 }>
                  <Button 
                    disabled={ isAuthenticating }
                    onClick={ onGoogleSignIn }
                    variant="container" 
                    fullWidth 
                    sx={{ backgroundColor: '#919191'}}
                    >
                    <Google/>
                    <Typography sx={{ ml:1 }}>Google</Typography>
                  </Button>
                </Grid>

              </Grid>
              <Box component="div" justifyContent="space-between" direction="row" display="flex" width="100%">
                <Link component={ RouterLink } color='inherit' to="/">
                Home
                </Link>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                Sign up now
                </Link>
              </Box>
            </Grid>
          </form>
    </AuthLayout>
    
  )
}



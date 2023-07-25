import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "./layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import Swal from "sweetalert2";


const formData = {
  email: '',
  password: '',
  password2: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'The email must have an @'],
  password: [ (value) => value.length >= 6, 'The password must be greater than or equal to 6 letters'],
  password2: [ (value) => value.length >= 6,  'The password must be greater than or equal to 6 letters' ],
  displayName: [ (value) => value.length >= 1, 'The name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);
  const [passwordsMatchError, setPasswordMatchError] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const { 
    formState, displayName, email, password, password2, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid, password2Valid
  } = useForm(formData, formValidations);

  useEffect(() => {
    if (password.length > 0) {
      if (password2.length > 2 && password2 !== password) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
  }, [password, password2])
  

  const onSubmit = ( event ) => {
    event.preventDefault();
    setformSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) );
  } 

    return (
    <AuthLayout title="Register">
          <form onSubmit={ onSubmit }>
            <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Name" 
                  type="name" 
                  placeholder="Name"
                  fullWidth
                  required
                  name="displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  autoComplete="off"
                  error={ !!displayNameValid  && formSubmitted }
                  helperText={ displayNameValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Email" 
                  type="email" 
                  placeholder="email@google.com"
                  fullWidth
                  required
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  autoComplete="off"
                  error={ !!emailValid  && formSubmitted}
                  helperText={ emailValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth
                  name="password"
                  required
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid  && formSubmitted }
                  helperText={ passwordValid }
                  />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Confirm Password" 
                  type="password" 
                  placeholder="Confirm Password"
                  fullWidth
                  name="password2"
                  required
                  value={ password2 }
                  onChange={ onInputChange }
                  error={ !!password2Valid  && formSubmitted  }
                  helperText={ passwordsMatchError === true ? 'Passwords do not match' : password2Valid }
                  />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 2 }}>

              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none'}
                >
                  <Alert severity="error">{ errorMessage }</Alert>
                </Grid>

                <Grid item xs={ 12 }>
                  <Button 
                    disabled={ isCheckingAuthentication }
                    type="submit"
                    variant="container" 
                    fullWidth 
                    sx={{ backgroundColor: '#919191'}}
                    >
                    Sign Up
                  </Button>
                </Grid>

              </Grid>
              <Grid container direction="row" justifyContent="end">
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                Login
                </Link>
              </Grid>
            </Grid>
          </form>
    </AuthLayout>
    
  )
}

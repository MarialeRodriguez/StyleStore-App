import { Route, Routes } from 'react-router-dom';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { StoreStyleAuth } from "../StoreStyle/routes/StoreStyleAuth";
import { CheckOut } from '../StoreStyle/pages/CheckOut';


export const AppRouter = () => {

  const { status } = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

    return (

      <Routes>

            <Route path='/*' element={ <StoreStyleAuth/> }/>

        {
          ( status === 'authenticated' )
          ? <Route path='/*' element={ <StoreStyleAuth/> }/>
          : <Route path='/auth/*' element={<AuthRoutes />} />
        }

        { status === 'authenticated'  && <Route path='/checkout'  element={<CheckOut />} />}
        
      </Routes>
        
    )
  }
import { AppRouter } from './routes/AppRouter';
import { AppTheme } from './theme/AppTheme';

export const StoreApp = () => {
  return (
    <AppTheme>
    <AppRouter/>
    </AppTheme>
  )
}

export default StoreApp;
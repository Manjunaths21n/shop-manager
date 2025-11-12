import { RouterProvider } from 'react-router';
import { storeManagerBrowserRouter } from './routes/routes';
import { AppContextProvider, ServiceProvider } from './context';

function App() {

  return (
    <AppContextProvider>
    <ServiceProvider>
      <RouterProvider router={storeManagerBrowserRouter} />
    </ServiceProvider>
    </AppContextProvider>
  );
}

export default App

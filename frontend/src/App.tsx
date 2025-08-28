import { RouterProvider } from 'react-router';
import { storeManagerBrowserRouter } from './routes/routes';
import { ServiceProvider } from './context';

function App() {

  return (
    <ServiceProvider>
      <RouterProvider router={storeManagerBrowserRouter} />
    </ServiceProvider>
  );
}

export default App

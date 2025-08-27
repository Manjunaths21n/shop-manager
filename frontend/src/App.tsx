import { RouterProvider } from 'react-router';
import { storeManagerBrowserRouter } from './routes/routes';

function App() {

  return (
    <RouterProvider router={storeManagerBrowserRouter} />
  );
}

export default App

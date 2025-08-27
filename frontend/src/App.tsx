import { Container } from '@mui/material';
import { ButtonAppBar, EnhancedTable } from './components';
import { createRoutesFromElements, Route, createBrowserRouter, RouterProvider } from 'react-router';
import { storeManagerBrowserRouter } from './routes/routes';

function App() {

  return (
    <>
      <RouterProvider router={storeManagerBrowserRouter} />
    </>
  );
}

export default App


// Usually used in a declarative router
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route index element={<StepOne />} />
//         <Route path="step-2" element={<StepTwo />} />
//         <Route path="step-3" element={<StepThree />} />
//       </Routes>
//    </BrowserRouter>
//   );
// }


// function App2() {
//   return <RouterProvider router={storeManagerBrowserRouter} />;
// }

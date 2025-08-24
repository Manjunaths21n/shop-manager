import { Container } from '@mui/material';
import { ButtonAppBar, EnhancedTable } from './components';

function App() {

  return (
    <>
      <ButtonAppBar />
      <Container sx={{ marginTop: 2 }} >
        <EnhancedTable />
      </Container>
    </>
  );
}

export default App

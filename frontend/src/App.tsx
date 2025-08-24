// import EnhancedTable from './components/mui-table';
import { Container } from '@mui/material';
// import ButtonAppBar from './components/app-bar';
import {ButtonAppBar, EnhancedTable} from './components';

function App() {

  return (
    <>
      <ButtonAppBar />
      <Container  >
        <EnhancedTable />
      </Container>
    </>
  );
}

export default App

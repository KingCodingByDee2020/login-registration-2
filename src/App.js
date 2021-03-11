import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './index.css';
import { Form } from 'components';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Form />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

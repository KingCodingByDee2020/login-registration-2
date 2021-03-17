import { ChakraProvider, Container, Grid, theme } from '@chakra-ui/react';
import { LoginPage } from 'pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Container>
          <Router>
            <Switch>
              <Route path="/">
                <LoginPage />
              </Route>
            </Switch>
          </Router>
        </Container>
      </Grid>
    </ChakraProvider>
  );
}

export default App;

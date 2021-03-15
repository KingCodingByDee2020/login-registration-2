import {
  Button,
  ButtonGroup,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

function LoginRegistrationForm() {
  // `forgot` is the state - initialized false
  const [forgot, setForgot] = useState(false);

  const handleClick = () => {
    setForgot(prev => !prev);
  };

  const handleSubmit = event => {
    event.preventDefault();

    /**
     * TODOs: 1. Identify which button was clicked from its `innerText` so we know which api method to trigger.
     */

    console.log(event, 'xxx');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>

      <Collapse in={!forgot} animateOpacity>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </Collapse>

      <ButtonGroup variant="outline" spacing="6">
        <Button type="submit" colorScheme="green">
          {forgot ? 'Reset Password' : 'Login'}
        </Button>

        <Fade in={!forgot} animateOpacity>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </Fade>

        <Button type="button" colorScheme="orange" onClick={handleClick}>
          {forgot ? 'Login/Register' : 'Forgot Password?'}
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default LoginRegistrationForm;

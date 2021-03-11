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
  const [forgot, setForgot] = useState(false);

  const handleClick = () => {
    setForgot(prev => !prev);
  };

  return (
    <form className="flex flex-col gap-4">
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
        <Button colorScheme="green">
          {forgot ? 'Reset Password' : 'Login'}
        </Button>

        <Fade in={!forgot} animateOpacity>
          <Button colorScheme="blue">Register</Button>
        </Fade>

        <Button colorScheme="orange" onClick={handleClick}>
          {forgot ? 'Login/Register' : 'Forgot Password?'}
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default LoginRegistrationForm;

import {
  Button,
  ButtonGroup,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import api from 'api';
import { useState } from 'react';

function LoginRegistrationForm() {
  const [forgot, setForgot] = useState(false);

  const handleClick = () => {
    setForgot(prev => !prev);
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    switch (event.nativeEvent.submitter.innerText) {
      case 'Reset Password':
        const msg = await api.update(email);
        setInfo(() => msg);
        break;
      case 'Login':
        api.show(email, password);
        break;
      default:
        api.create(email, password);
    }
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

      {info ? <p className="text-red-300">{info}</p> : null}
    </form>
  );
}

export default LoginRegistrationForm;

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

// function reducer(state, {type, payload}) {
//   switch (type) {
//     case 'login':
//       return { ...state, ...{ mode: 'login', info: '' } };
//     case 'register':
//       return { ...state, ...{ mode: 'registration', info: '' } };
//     case 'fo'
//     default:
//       throw new Error('Illegal 🙅🏾‍♂️ action!');
//   }
// }

function renderSubmitTxt(mode) {
  switch (mode) {
    case 'login':
      return 'Login';
    case 'registration':
      return 'Register';
    case 'forgotten':
      return 'Reset Password';
    default:
      throw new Error('Illegal form mode');
  }
}

function LoginRegistrationForm() {
  const [mode, setMode] = useState('login');
  const [info, setInfo] = useState('');

  const handleClick = ({ target: { innerText } }) => {
    if (
      innerText === 'Already Have an Account?' ||
      innerText === 'Login/Register'
    ) {
      setMode(() => 'login');
    } else {
      switch (innerText) {
        case 'No Account Yet?':
          setMode(() => 'registration');
          break;

        case 'Forgot Password?':
          setMode(() => 'forgotten');
          break;
        default:
          throw new Error('Illegal 🙅🏾‍♂️ action!');
      }
    }
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    switch (mode) {
      case 'login':
        try {
          const user = await api.show(email, password);
          console.log(user);
        } catch (error) {
          setInfo(() => error.message);
        }
        break;
      case 'registration':
        try {
          const user = await api.create(email, password);
          console.log(user);
        } catch (error) {
          setInfo(() => error.message);
        }
        break;
      case 'forgotten':
        try {
          const msg = await api.update(email);
          setInfo(() => msg);
        } catch (error) {
          setInfo(() => error.message);
        }
        break;
      default:
        throw new Error('Illegal 🙅🏾‍♂️ action!');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" required />
      </FormControl>

      <Collapse in={!(mode === 'forgotten')} animateOpacity>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </Collapse>

      <Collapse in={mode === 'registration'} animateOpacity>
        <FormControl id="name">
          <FormLabel>Full Name</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl id="profile">
          <FormLabel>Upload a Profile Pic?</FormLabel>
          <Input type="file" accept="image/*" />
        </FormControl>
      </Collapse>

      <ButtonGroup variant="outline" spacing="6">
        <Button type="submit" colorScheme="green">
          {renderSubmitTxt(mode)}
        </Button>

        <Fade in={!(mode === 'forgotten')}>
          <Button type="button" colorScheme="blue" onClick={handleClick}>
            {mode === 'login' ? 'No Account Yet?' : 'Already Have an Account?'}
          </Button>
        </Fade>

        <Button type="button" colorScheme="orange" onClick={handleClick}>
          {mode === 'forgotten' ? 'Login/Register' : 'Forgot Password?'}
        </Button>
      </ButtonGroup>

      {info ? <p className="text-red-300">{info}</p> : null}
    </form>
  );
}

export default LoginRegistrationForm;

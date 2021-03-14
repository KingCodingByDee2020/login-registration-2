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
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'toggleForgot':
      const { forgot: prev } = state;
      return { ...state, ...{ forgot: !prev, info: '' } };
    case 'updateInfo':
      return { ...state, ...{ info: action.payload } };
    default:
      throw new Error('Illegal 🙅🏾‍♂️ action!');
  }
}

function LoginRegistrationForm() {
  const [formState, dispatch] = useReducer(reducer, { forgot: false });

  const handleClick = () => {
    dispatch({ type: 'toggleForgot' });
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    switch (event.nativeEvent.submitter.innerText) {
      case 'Login':
        try {
          const user = await api.show(email, password);
          console.log(user);
        } catch (error) {
          dispatch({ type: 'updateInfo', payload: error.message });
        }
        break;
      case 'Register':
        try {
          const user = await api.create(email, password);
          console.log(user);
        } catch (error) {
          dispatch({ type: 'updateInfo', payload: error.message });
        }
        break;
      case 'Reset Password':
        try {
          const msg = await api.update(email);
          dispatch({ type: 'updateInfo', payload: msg });
        } catch (error) {
          dispatch({ type: 'updateInfo', payload: error.message });
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

      <Collapse in={!formState.forgot} animateOpacity>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" required minLength="6" />
        </FormControl>
      </Collapse>

      <ButtonGroup variant="outline" spacing="6">
        <Button type="submit" colorScheme="green">
          {formState.forgot ? 'Reset Password' : 'Login'}
        </Button>

        <Fade in={!formState.forgot} animateOpacity>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </Fade>

        <Button type="button" colorScheme="orange" onClick={handleClick}>
          {formState.forgot ? 'Login/Register' : 'Forgot Password?'}
        </Button>
      </ButtonGroup>

      {formState.info ? <p className="text-red-300">{formState.info}</p> : null}
    </form>
  );
}

export default LoginRegistrationForm;

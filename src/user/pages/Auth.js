import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import './Auth.css';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
function Auth() {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  });
  const [isLoginMode, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: '',
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json(); // to parse response body
        if (!response.ok) {
          throw new Error(
            responseData.message ||
              'something went wrong please try agian later'
          );
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message || 'something went wrong, please try again later!'
        );
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json(); // to parse response body
        if (!response.ok) {
          throw new Error(
            response.message ||
              'something went wroong please try agian later'
          );
        }
        setIsLoading(false);
        auth.login();
        console.log(responseData);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(
          err.message || 'something went wrong, please try again later!'
        );
      }
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2> Login Required</h2>
        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              placeholder="name"
              label="name"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please provide a Name"
              onInput={inputHandler}
            ></Input>
          )}
          <Input
            id="email"
            element="input"
            placeholder="Email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="please provide a correct email"
            onInput={inputHandler}
          ></Input>
          <Input
            id="password"
            element="input"
            type="Password"
            placeholder="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="please provide a password with 5 chara length"
            onInput={inputHandler}
          ></Input>
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Signup'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch To {isLoginMode ? 'Signup' : ' Login'}
        </Button>
      </Card>
    </>
  );
}

export default Auth;

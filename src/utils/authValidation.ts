import { Dispatch, SetStateAction } from 'react';

type inputType = { value: string; error: string };

export const authValidation = (
  email: inputType,
  password: inputType,
  setEmail: Dispatch<SetStateAction<inputType>>,
  setPassword: Dispatch<SetStateAction<inputType>>
) => {
  if (!email.value) {
    setEmail((perval) => ({
      ...perval,
      error: 'Please enter a valid email address',
    }));
    return false;
  }

  if (!email.value.includes('@')) {
    setEmail((perval) => ({
      ...perval,
      error: 'Please enter a valid email address',
    }));
    return false;
  }

  if (!password.value) {
    setPassword((perval) => ({
      ...perval,
      error: 'Please enter a password',
    }));
    return false;
  }

  if (password.value.length !== 0 && password.value.length < 6) {
    setPassword((perval) => ({
      ...perval,
      error: 'password should be more than 6 characters!',
    }));
    return false;
  }
  return true;
};

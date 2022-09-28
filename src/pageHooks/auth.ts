import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { authValidation } from '../utils/authValidation';
import { signIn } from 'next-auth/react';

export const useAuth = (whichPage: string) => {
  const router = useRouter();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loginError, setLoginError] = useState('');
  const [toast, setToast] = useState(false);

  const createUser = async () => {
    const canPass = authValidation(email, password, setEmail, setPassword);

    if (!canPass) return;

    if (whichPage.includes('login')) {
      const response = await signIn('credentials', {
        redirect: false,
        email: email.value,
        password: password.value,
      });
      response;

      if (response?.error) {
        setLoginError(response.error);
        setToast(true);
        return;
      }

      if (response && response.url?.includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            fromAdmin: true,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          if (data.field.includes('email')) {
            setEmail((perval) => ({ ...perval, error: data.error }));
          } else {
            setPassword((perval) => ({ ...perval, error: data.error }));
          }
        } else {
          router.replace('/login');
        }
      } catch (error) {
        error;
      }
    }
  };

  return {
    get: {
      email,
      password,
      loginError,
      toast,
    },
    set: {
      setPassword,
      setEmail,
      setToast,
    },
    on: { createUser },
  };
};

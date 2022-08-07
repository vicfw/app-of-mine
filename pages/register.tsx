import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import CustomButton from '../src/components/ui-kit/Button/Button';
import style from '../src/styles/register.module.css';
import { Colors } from '../src/utils/colors';

const Register: FC<any> = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const createUser = async () => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      const data = await res.json();

      console.log(data, 'front');

      if (!data.success) {
        if (data.field.includes('email')) {
          setEmail((perval) => ({ ...perval, error: data.error }));
        } else {
          setPassword((perval) => ({ ...perval, error: data.error }));
        }
      } else {
        router.replace('/login');
      }
    } catch (error) {}
  };

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={() => {}}>
        <div className={style.header}>
          <PersonIcon
            sx={{
              color: '#fff ',
              fontSize: '50px',
            }}
          />
        </div>
        <div className={style.inputs}>
          <TextField
            name="email"
            type="email"
            label={email.value ? '' : 'Email ID'}
            size="small"
            onChange={(e) => setEmail({ error: '', value: e.target.value })}
            value={email.value}
            helperText={email.error}
            error={!!email.error}
            sx={{
              backgroundColor: '#fff',
              border: 'none',
              '& .MuiInputBase-root:hover': {
                border: 'none',
              },
              '& .MuiFormLabel-root': {
                left: '30px',
                color: 'primary.dark',
              },
            }}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              autoComplete: 'none',
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <EmailIcon sx={{ color: 'primary.dark' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            type="password"
            label={password.value ? '' : 'Password'}
            size="small"
            value={password.value}
            onChange={(e) => setPassword({ error: '', value: e.target.value })}
            sx={{
              backgroundColor: '#fff',
              border: 'none',
              '& .MuiInputBase-root:hover': {
                border: 'none',
              },
              '& .MuiFormLabel-root': {
                left: '30px',
                color: 'primary.dark',
              },
            }}
            helperText={password.error}
            error={!!password.error}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              autoComplete: 'none',
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ backgroundColor: '#fff' }}
                >
                  <HttpsIcon sx={{ color: 'primary.dark' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" sx={{ gap: '10px' }}>
            <CustomButton
              label="REGISTER"
              color={Colors.primary.dark}
              boxShadowColor={Colors.primary.light}
              onClick={createUser}
            />
            <CustomButton
              label="LOGIN NOW"
              color={Colors.secondary.dark}
              boxShadowColor={Colors.secondary.light}
              onClick={() => router.push('/login')}
            />
          </Box>
          <CustomButton
            label="FORGOT PASSWORD"
            color={Colors.grey.main}
            boxShadowColor={Colors.grey.dark}
          />
        </div>
      </form>
    </div>
  );
};
export default Register;

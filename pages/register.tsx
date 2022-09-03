import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CustomButton from '../src/components/ui-kit/Button/Button';
import { useAuth } from '../src/pageHooks/auth';
import style from '../src/styles/register.module.css';
import { Colors } from '../src/utils/colors';

const Register: FC<any> = ({}) => {
  const router = useRouter();

  const { get, set, on } = useAuth('signup');

  return (
    <div className={style.wrapper}>
      <Box className={style.form} sx={{ margin: { xs: ' 0 10px' } }}>
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
            label={get.email.value ? '' : 'Email ID'}
            size="small"
            onChange={(e) => set.setEmail({ error: '', value: e.target.value })}
            value={get.email.value}
            helperText={get.email.error}
            error={!!get.email.error}
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
            label={get.password.value ? '' : 'Password'}
            size="small"
            value={get.password.value}
            onChange={(e) =>
              set.setPassword({ error: '', value: e.target.value })
            }
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
            helperText={get.password.error}
            error={!!get.password.error}
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
              onClick={on.createUser}
              sx={{ display: 'flex', flex: 1, fontSize: { xs: '13px' } }}
            />
            <CustomButton
              label="LOGIN NOW"
              color={Colors.secondary.dark}
              boxShadowColor={Colors.secondary.light}
              sx={{ display: 'flex', flex: 1, fontSize: { xs: '13px' } }}
              onClick={() => router.push('/login')}
            />
          </Box>
          {/* <CustomButton
            label="FORGOT PASSWORD"
            color={Colors.grey.main}
            boxShadowColor={Colors.grey.dark}
          /> */}
        </div>
      </Box>
    </div>
  );
};
export default Register;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};

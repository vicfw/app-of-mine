import { Input } from '@mui/material';
import { FC } from 'react';

const Login: FC<any> = ({}) => {
  return (
    <div>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
    </div>
  );
};
export default Login;

import { Button, ButtonBaseProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

interface CustomButtonProps extends ButtonBaseProps {
  label: string;
  color?: string;
  boxShadowColor: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  label,
  color = 'red',
  boxShadowColor = 'red',
  ...props
}) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    backgroundColor: color,
    boxShadow: `3px 3px 0px ${boxShadowColor}`,
    borderRadius: '0',

    '&:hover': {
      backgroundColor: color,
      borderRadius: '0',
      boxShadow: `3px 3px 0px ${boxShadowColor}`,
    },
  }));

  return (
    <ColorButton
      {...props}
      sx={{ display: 'flex', flex: 1 }}
      variant="contained"
    >
      {label}
    </ColorButton>
  );
};

export default CustomButton;

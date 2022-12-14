import { Paper, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Colors } from '../../utils/colors';

interface AdPropTypes {
  image: string;
  isPop?: boolean;
  title: string;
  description: string;
  number: string;
  bgColor: string;
  id: string;
  isFirst?: boolean;
}

const Ad: FC<AdPropTypes> = ({
  image,
  isPop,
  title,
  description,
  number,
  bgColor,
  id,
  isFirst,
}) => {
  const router = useRouter();

  return (
    <Paper
      id={isFirst ? 'first' : ''}
      sx={{
        backgroundColor: bgColor,
        padding: '22px',
        borderRadius: '10px',
        cursor: 'pointer',
        zIndex: 100,
        boxShadow:
          '0px 1px 1px 5px rgb(0 0 0 / 1%), 0px 1px 1px 1px rgb(0 0 0 / 1%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      }}
      onClick={() => router.push(`/ad/${id}`)}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={1}
      >
        <Image
          width={250}
          height={230}
          src={image}
          style={{ borderRadius: '10px' }}
        />
      </Box>
      <Typography component={'h3'} sx={{ color: '#000', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography component={'p'} sx={{ color: Colors.grey.dark }}>
        {description.length > 25
          ? description.slice(0, 25) + '...'
          : description}
      </Typography>

      <Typography
        component={'span'}
        sx={{
          backgroundColor: isPop ? '#cdead7' : 'transparent',
          color: '#07c442',
          padding: '1px 5px',
          borderRadius: '8px',
          fontWeight: 'bolder',
          fontSize: '20px',
        }}
      >
        {isPop ? 'POP' : ''}
      </Typography>

      <Typography
        component={'p'}
        sx={{ color: Colors.grey.dark, fontSize: '20px' }}
      >
        {number}
      </Typography>
    </Paper>
  );
};
export default Ad;

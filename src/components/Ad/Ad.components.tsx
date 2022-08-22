import { Paper, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Colors } from '../../utils/colors';
import fs from 'path';

interface AdPropTypes {
  image: string;
  isPop?: boolean;
  title: string;
  description: string;
  number: string;
  bgColor: string;
}

const Ad: FC<AdPropTypes> = ({
  image,
  isPop,
  title,
  description,
  number,
  bgColor,
}) => {
  return (
    <Paper
      sx={{
        backgroundColor: bgColor,
        padding: '20px',
        borderRadius: '10px',
      }}
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
          src={image ? require(`../../../uploads${image}`) : ''}
          style={{ borderRadius: '10px' }}
        />
      </Box>
      <Typography component={'h3'} sx={{ color: '#000', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography component={'p'} sx={{ color: Colors.grey.dark }}>
        {description}
      </Typography>
      {isPop && (
        <Typography
          component={'span'}
          sx={{
            backgroundColor: Colors.primary.main,
            color: '#04e940',
            padding: '5px',
            borderRadius: '8px',
            fontWeight: 'bolder',
            fontSize: '20px',
          }}
        >
          POP
        </Typography>
      )}

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

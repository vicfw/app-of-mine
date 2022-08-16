import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Colors } from '../../utils/colors';

interface CategoriesPropTypes {
  adCount?: number;
  image: string;
  name: string;
}

const Categories: FC<CategoriesPropTypes> = ({
  adCount = 222,
  image,
  name,
}) => {
  return (
    <Paper sx={{ backgroundColor: Colors.grey.light, padding: 2 }}>
      <p style={{ textAlign: 'right' }}>{adCount}</p>
      <Box
        width={'100%'}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Image src={image} alt={image} width={200} height={200} />
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          color: Colors.grey.dark,
        }}
        component="h2"
      >
        {name}
      </Typography>
    </Paper>
  );
};
export default Categories;

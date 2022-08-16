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
    <Paper sx={{ backgroundColor: Colors.grey.light }}>
      <p>{adCount}</p>
      <Box>
        <Image src={image} alt={image} width={200} height={200} />
      </Box>
      <Typography component="h2">{name}</Typography>
    </Paper>
  );
};
export default Categories;

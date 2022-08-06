import { Box } from '@mui/material';
import { FC } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import NextLink from 'next/link';

const Header: FC<any> = ({}) => {
  return (
    <Box sx={{ minHeight: 50 }} bgcolor="#ccc">
      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems={'center'}
        width="80%"
        minHeight={50}
        margin={'auto'}
      >
        <Box
          color={'#464545'}
          display="flex"
          style={{ cursor: 'pointer', gap: 10 }}
        >
          <span>Cars,Trucks {'&'} SUVs</span>
          <span>Commercial / Heavy Trucks</span>
          <span>Trailers</span>
          <span>RVs</span>
          <span>Boats</span>
          <span>Watercraft</span>
          <span>Bikes {'&'} ATVs</span>
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          style={{ cursor: 'pointer', gap: 10 }}
        >
          <FaceIcon />
          <NextLink href={'/login'}>
            <Box component={'span'} sx={{ fontWeight: 'bold' }}>
              Log In
            </Box>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};
export default Header;

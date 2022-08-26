import { Box, Button, Container } from '@mui/material';
import { FC } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Colors } from '../../utils/colors';

const Header: FC<any> = ({}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Truck app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ minHeight: 50 }} bgcolor="#ccc">
        <Container>
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
            minHeight={50}
          >
            <Box
              color={Colors.grey.dark}
              display="flex"
              style={{ cursor: 'pointer', gap: 10 }}
            >
              <span>Commercial / Heavy Trucks</span>
              <span>Trailers</span>
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              style={{ cursor: 'pointer', gap: 10 }}
            >
              <FaceIcon sx={{ color: Colors.grey.dark }} />
              <NextLink href={'/login'}>
                <Box
                  component={'span'}
                  sx={{ fontWeight: 'bold', color: Colors.grey.dark }}
                >
                  Log In
                </Box>
              </NextLink>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{ minHeight: 50, boxShadow: '2px 1px 3px #ccc' }}
        bgcolor="#fff"
        borderBottom="1px solid #ccc"
      >
        <Container>
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
            minHeight={50}
          >
            <Box
              color={'#464545'}
              display="flex"
              style={{ cursor: 'pointer', gap: 10, width: 120, height: 70 }}
              onClick={() => router.push('/')}
            >
              <Image src="/logo.png" width={200} height={200} />
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              style={{ cursor: 'pointer', gap: 10 }}
            >
              <NextLink href={'/create-advertising'}>
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    borderRadius: 10,
                    backgroundImage:
                      'linear-gradient(180deg, rgba(141,206,179,1) 0%, #12d685 74%)',
                    textTransform: 'capitalize',
                  }}
                >
                  Sell My Truck/Trailer
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Header;

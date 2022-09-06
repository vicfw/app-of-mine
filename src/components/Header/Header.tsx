import { Box, Button, Container } from '@mui/material';
import { FC } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Colors } from '../../utils/colors';
import { useSession } from 'next-auth/react';

const Header: FC<any> = ({}) => {
  const router = useRouter();

  const session = useSession();

  return (
    <>
      <Head>
        <title>Truck app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ minHeight: 50 }} bgcolor={Colors.grey.light}>
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
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <span>Commercial / Heavy Trucks</span>
              <span>Trailers</span>
            </Box>

            <Box
              display={'flex'}
              alignItems={'center'}
              style={{ cursor: 'pointer', gap: 10 }}
            >
              {session.status !== 'authenticated' && (
                <FaceIcon sx={{ color: Colors.grey.dark }} />
              )}

              <NextLink href={'/login'} prefetch={false}>
                <Box
                  component={'span'}
                  sx={{ fontWeight: 'bold', color: Colors.grey.dark }}
                >
                  {session.data?.user
                    ? `Welcome ${session.data?.user.email}`
                    : 'Login'}
                </Box>
              </NextLink>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          minHeight: 50,
          boxShadow: 'inset 1px -3px 3px rgba(0,0,0,20%)',
          zIndex: 100,
        }}
        bgcolor="#fff"
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
              <NextLink href={'/create-advertising'} prefetch={false}>
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    borderRadius: 10,
                    backgroundColor: '#12d685',
                    textTransform: 'capitalize',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                      backgroundColor: '#12d685',
                    },
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

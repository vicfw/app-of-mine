import { Box, Button, Container } from '@mui/material';
import { FC } from 'react';
import FaceIcon from '@mui/icons-material/Face';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Colors } from '../../utils/colors';
import { useSession } from 'next-auth/react';

const Header: FC<{ title?: string }> = ({ title }) => {
  const router = useRouter();

  const session = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box sx={{ minHeight: 50 }} bgcolor={'#eff0f1'}>
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
          boxShadow: '1px 2px 4px 0px rgb(0 0 0 / 20%)',
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
              style={{ cursor: 'pointer', gap: 10, width: 150, height: 40 }}
              onClick={() => router.push('/')}
            >
              <Image src="/logo.png" width={300} height={50} />
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
                    backgroundColor: '#01c23d',
                    transition: 'all 0.3s ease ',
                    textTransform: 'capitalize',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '2px 2px 1px  #ccc',
                      backgroundColor: '#01c23d',
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

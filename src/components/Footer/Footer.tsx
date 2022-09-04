import { Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Colors } from '../../utils/colors';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: FC<any> = ({}) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#42414c',
        marginTop: '25px',
        padding: '0 0 25px 0',
      }}
    >
      <Container>
        <Grid container pt={5} color={'#fff'}>
          <Grid
            item
            lg={2}
            xs={12}
            sx={{
              display: { xs: 'flex' },
              alignItems: { xs: 'center' },
              flexDirection: { xs: 'column' },
              marginBottom: { xs: '10px' },
            }}
          >
            <Typography component={'h2'} fontWeight={'bold'} fontSize={25}>
              Get Truck
            </Typography>
            <Typography>Halimun Stree 25</Typography>
            <Typography>Jakartam Indonesia</Typography>
            <Typography>12850</Typography>
            <Typography mt={3}>www.gettruck.com</Typography>
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: 'center' } }}>
            <Typography component={'h3'} fontSize={17}>
              Sitemap
            </Typography>
            <Typography>Home</Typography>
            <Typography>About</Typography>
            <Typography>Blog</Typography>
            <Typography>Menu</Typography>
            <Typography>Store</Typography>
            <Typography>Contact</Typography>
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: 'center' } }}>
            <Typography component={'h3'} fontSize={17}>
              Menu
            </Typography>
            <Typography>Trailers</Typography>
            <Typography>RVs</Typography>
            <Typography>Boats</Typography>
            <Typography>Boats</Typography>
            <Typography>WaterCraft</Typography>
            <Typography>Bikes {'&'} ATV's</Typography>
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: 'center' } }}>
            <Typography component={'h3'} fontSize={17}>
              Sit Amet
            </Typography>
            <Typography>Sit Amet</Typography>
            <Typography>Sit Amet</Typography>
            <Typography>Sit Amet</Typography>
            <Typography>Sit Amet</Typography>
            <Typography>Sit Amet</Typography>
            <Typography>Sit Amet</Typography>
          </Grid>
          <Grid
            item
            lg={4}
            display="flex"
            flexDirection={'column'}
            alignItems="center"
            gap="10px"
            xs={12}
            sx={{
              justifyContent: { xs: 'center' },
            }}
          >
            <Image src="/logo.png" width={80} height={50} />
            <Typography component={'h3'}>
              Copyright &copy; 2020 getTruck
            </Typography>
            <Typography component={'h3'}>
              Company J.T All rights reserved.
            </Typography>
            <Grid display={'flex'} gap="10px" sx={{ cursor: 'pointer' }}>
              <FacebookIcon />
              <GoogleIcon />
              <TwitterIcon />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
export default Footer;

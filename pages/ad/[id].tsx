import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { FC } from 'react';
import Layout from '../../src/components/Layout/Layout';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';

const SingleAd: FC<any> = ({}) => {
  return (
    <Layout>
      <Container sx={{ marginTop: '20px' }}>
        {/* breadcrumb */}
        <Paper
          sx={{
            backgroundColor: '#efefef',
            padding: '20px 40px',
            borderRadius: '10px',
            boxShadow: '2px 5px 5px #b3b3b3 ',
          }}
        >
          <Box display={'flex'} alignContent="center">
            <HomeIcon />
            <Box
              display={'flex'}
              alignContent="center"
              ml={1}
              sx={{ marginTop: '2px' }}
            >
              <Typography
                component={'span'}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Home
              </Typography>
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ marginTop: '4px', fontSize: '15px' }}
              />
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                ad title
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Grid container mt={1} spacing={2}>
          <Grid item lg={8} xs={12}>
            <Paper
              sx={{
                backgroundColor: '#efefef',
                padding: '20px 40px',
                borderRadius: '10px',
                boxShadow: '2px 5px 5px #b3b3b3 ',
              }}
            >
              <Box>
                <Image
                  src={'/term-bg-1-666de2d941529c25aa511dc18d727160.jpg'}
                  width={200}
                  height={150}
                  layout="responsive"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Paper
              sx={{
                backgroundColor: '#efefef',
                padding: '20px 40px',
                borderRadius: '10px',
                boxShadow: '2px 5px 5px #b3b3b3 ',
              }}
            >
              <Box display={'flex'} justifyContent="center">
                <Image
                  src={'/term-bg-1-666de2d941529c25aa511dc18d727160.jpg'}
                  width={200}
                  height={200}
                />
              </Box>
              <Box
                display={'flex'}
                flexDirection="column"
                gap="10px"
                justifyContent="center"
                mt={1}
              >
                <Button sx={{ color: '#fff' }} variant="contained">
                  phone number
                </Button>
                <Button variant="outlined">site.user@gamil.com</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default SingleAd;

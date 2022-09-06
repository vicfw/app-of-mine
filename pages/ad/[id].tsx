import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Carousel } from '@trendyol-js/react-carousel';
import Image from 'next/image';
import { GetServerSideProps } from 'next/types';
import { FC } from 'react';
import Ad from '../../models/Ad';
import AdComponent from '../../src/components/Ad/Ad.components';
import Layout from '../../src/components/Layout/Layout';
import { Colors } from '../../src/utils/colors';
import dbConnect from '../../src/utils/dbConnect';
import { AdsType } from '../../types/ad';
import NextLink from 'next/link';
import useMediaQuery from '../../src/utils/useMediaQuery';

interface SingleAdPropsTypes {
  ad: AdsType;
  popularAds: AdsType[];
}

const SingleAd: FC<SingleAdPropsTypes> = ({ ad, popularAds }) => {
  const matches = useMediaQuery('(max-width: 500px)');

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
              <NextLink href="/" prefetch={false}>
                <Typography
                  component={'span'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  Home
                </Typography>
              </NextLink>
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ marginTop: '4px', fontSize: '15px' }}
              />
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                {ad.title}
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
                '& .carousel': {
                  alignItems: 'center',
                },
              }}
            >
              <Carousel
                responsive
                show={1}
                slide={1}
                rightArrow={
                  <ArrowForwardIosIcon
                    sx={{ color: Colors.grey.dark, cursor: 'pointer' }}
                  />
                }
                leftArrow={
                  <ArrowBackIosIcon
                    sx={{ color: Colors.grey.dark, cursor: 'pointer' }}
                  />
                }
                className="carousel"
              >
                {ad.images.map((img) => {
                  return (
                    <Box key={img.img}>
                      <Image
                        src={img.img}
                        width={200}
                        height={150}
                        layout="responsive"
                      />
                    </Box>
                  );
                })}
              </Carousel>

              <Typography mt={1} fontSize="1.4rem" component={'h2'}>
                {ad.title}
              </Typography>
              <Divider sx={{ marginTop: '10px' }} />
              <Typography component={'p'}>{ad.description}</Typography>
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
                  {ad.phone}
                </Button>
                <Button variant="outlined">site.user@gamil.com</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Paper
          sx={{
            backgroundColor: '#efefef',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '2px 5px 5px #b3b3b3 ',
            marginTop: '20px',
            '& .carousel': {
              alignItems: 'center',
            },
          }}
        >
          <Carousel
            responsive
            show={matches ? 1 : 3}
            slide={1}
            rightArrow={
              <ArrowForwardIosIcon
                sx={{ color: Colors.grey.dark, cursor: 'pointer' }}
              />
            }
            infinite={false}
            leftArrow={
              <ArrowBackIosIcon
                sx={{ color: Colors.grey.dark, cursor: 'pointer' }}
              />
            }
            className="carousel"
          >
            {popularAds.map((ad) => {
              return (
                <Grid mx={1}>
                  <AdComponent
                    key={ad._id}
                    bgColor="#fff"
                    description={ad.description}
                    id={ad._id}
                    isPop
                    image={ad.images[0]?.img}
                    number={ad.phone}
                    title={ad.title}
                  />
                </Grid>
              );
            })}
          </Carousel>
        </Paper>
      </Container>
    </Layout>
  );
};
export default SingleAd;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (!context.params?.id) {
      throw new Error('Bad Request');
    }

    await dbConnect();
    const ad = await Ad.findById(context.params.id);
    const justPopularAds = await Ad.find({ isPopular: true })
      .sort({ createdAt: -1 })
      .limit(10);

    return {
      props: {
        ad: JSON.parse(JSON.stringify(ad)),
        popularAds: JSON.parse(JSON.stringify(justPopularAds)),
      },
    };
  } catch (e) {
    return { props: {} };
  }
};

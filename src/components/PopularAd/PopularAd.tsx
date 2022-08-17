import { Box, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Colors } from '../../utils/colors';

const PopularAd: FC<any> = ({}) => {
  return (
    <Paper sx={{ backgroundColor: Colors.grey.light, padding: '25px' }}>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Paper
            sx={{
              backgroundColor: '#fff',
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
                width={200}
                height={150}
                src="/media-1660753437124-926545028.png"
                style={{ borderRadius: '10px' }}
              />
            </Box>
            <Typography
              component={'h3'}
              sx={{ color: '#000', fontWeight: 'bold' }}
            >
              Title
            </Typography>
            <Typography component={'p'} sx={{ color: Colors.grey.dark }}>
              Description
            </Typography>
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
            <Typography
              component={'p'}
              sx={{ color: Colors.grey.dark, fontSize: '20px' }}
            >
              number
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <Paper
            sx={{
              backgroundColor: '#fff',
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
                width={200}
                height={150}
                src="/media-1660753437124-926545028.png"
                style={{ borderRadius: '10px' }}
              />
            </Box>
            <Typography
              component={'h3'}
              sx={{ color: '#000', fontWeight: 'bold' }}
            >
              Title
            </Typography>
            <Typography component={'p'} sx={{ color: Colors.grey.dark }}>
              Description
            </Typography>
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
            <Typography
              component={'p'}
              sx={{ color: Colors.grey.dark, fontSize: '20px' }}
            >
              number
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <Paper
            sx={{
              backgroundColor: '#fff',
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
                width={200}
                height={150}
                src="/media-1660753437124-926545028.png"
                style={{ borderRadius: '10px' }}
              />
            </Box>
            <Typography
              component={'h3'}
              sx={{ color: '#000', fontWeight: 'bold' }}
            >
              Title
            </Typography>
            <Typography component={'p'} sx={{ color: Colors.grey.dark }}>
              Description
            </Typography>
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
            <Typography
              component={'p'}
              sx={{ color: Colors.grey.dark, fontSize: '20px' }}
            >
              number
            </Typography>
          </Paper>
        </Grid>

        <Grid
          item
          lg={3}
          textAlign="center"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            component={'h2'}
            sx={{
              backgroundColor: Colors.primary.main,
              color: '#04e940',
              textAlign: 'center',
              maxWidth: '70px',
              padding: '5px',
              borderRadius: '8px',
              fontWeight: 'bolder',
              fontSize: '20px',
            }}
          >
            POP
          </Typography>
          <Typography
            component={'p'}
            sx={{ color: '#000', fontWeight: 'bold' }}
            py={5}
          >
            Most Popular Cars in Canada
          </Typography>
          <Typography component={'span'} sx={{ color: Colors.grey.dark }}>
            You can see the most popular cars for sale and purchase in Canada on
            our site
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PopularAd;

import { Container, Grid, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Colors } from '../../../utils/colors';
import Ad from '../../Ad/Ad.components';

const PopularAd: FC<any> = ({}) => {
  return (
    <Container sx={{ padding: '20px 0' }}>
      <Paper sx={{ backgroundColor: Colors.grey.light, padding: '25px' }}>
        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => {
            return (
              <Grid item lg={3}>
                <Ad
                  image="/media-1660753437124-926545028.png"
                  title="title"
                  description={'description'}
                  isPop={true}
                  number="number"
                  key={item}
                  bgColor="#fff"
                />
              </Grid>
            );
          })}

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
              You can see the most popular cars for sale and purchase in Canada
              on our site
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default PopularAd;

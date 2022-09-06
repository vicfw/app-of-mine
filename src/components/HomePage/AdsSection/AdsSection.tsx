import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { AdsType } from '../../../../types/ad';
import Ad from '../../Ad/Ad.components';

interface AdsSectionPropTypes {
  ads: AdsType[];
  searchResult: AdsType[];
}

const AdsSection: FC<AdsSectionPropTypes> = ({ ads, searchResult }) => {
  console.log(searchResult, 'searchResult');

  return (
    <Container sx={{ padding: { lg: '20px 0', xs: '20px 11px' } }}>
      <Grid container spacing={2}>
        {searchResult.length
          ? searchResult.map((ad, index) => {
              ad.images, 'ad.images';

              return (
                <Grid item lg={3} key={ad._id} xs={12}>
                  <Ad
                    title={ad.title}
                    id={ad._id}
                    description={ad.description}
                    number={ad.phone}
                    bgColor={'#f7f4f4'}
                    image={ad.images[0].img}
                    isFirst={index === 0}
                  />
                </Grid>
              );
            })
          : ads.map((ad, index) => {
              ad.images, 'ad.images';

              return (
                <Grid item lg={3} key={ad._id} xs={12}>
                  <Ad
                    title={ad.title}
                    id={ad._id}
                    description={ad.description}
                    number={ad.phone}
                    bgColor={'#f7f4f4'}
                    image={ad.images[0].img}
                    isFirst={index === 0}
                  />
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
};
export default AdsSection;

import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { AdsType } from '../../../../types/ad';
import { Colors } from '../../../utils/colors';
import Ad from '../../Ad/Ad.components';

interface AdsSectionPropTypes {
  ads: AdsType[];
}

const AdsSection: FC<AdsSectionPropTypes> = ({ ads }) => {
  return (
    <Container sx={{ padding: '20px 0' }}>
      <Grid container spacing={2}>
        {ads.length > 0
          ? ads.map((ad) => {
              ad.images, 'ad.images';

              return (
                <Grid item lg={3} key={ad._id}>
                  <Ad
                    title={ad.title}
                    description={ad.description}
                    number={ad.phone}
                    bgColor={Colors.grey.light}
                    image={ad.images[0].img}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
};
export default AdsSection;

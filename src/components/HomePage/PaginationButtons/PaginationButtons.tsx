import { Grid, Button, Container } from '@mui/material';
import router from 'next/router';
import { FC } from 'react';

interface PropTypes {
  page: string;
  haveAds: boolean;
}

const PaginationButtons: FC<PropTypes> = ({ page, haveAds }) => {
  return (
    <Container>
      <Grid container justifyContent={'center'} gap="10px">
        <Grid item>
          <Button
            variant="contained"
            sx={{
              color: '#fff',
              borderRadius: 10,
              backgroundImage:
                'linear-gradient(180deg, rgba(141,206,179,1) 0%, #12d685 74%)',
              textTransform: 'capitalize',
            }}
            onClick={() => {
              router.push(`/?page=${parseInt(page) + 1}`);
            }}
            id="btn"
            disabled={!haveAds}
          >
            Next Page
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={+page <= 0}
            sx={{
              color: '#fff',
              borderRadius: 10,
              backgroundImage:
                'linear-gradient(180deg, rgba(141,206,179,1) 0%, #12d685 74%)',
              textTransform: 'capitalize',
            }}
            onClick={() => {
              if (+page <= 0) {
                return;
              } else {
                router.push(`/?page=${parseInt(page) - 1}`);
              }
            }}
          >
            Previous Page
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PaginationButtons;

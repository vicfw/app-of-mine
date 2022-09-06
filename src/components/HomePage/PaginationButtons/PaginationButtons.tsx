import { Grid, Button, Container } from '@mui/material';
import router from 'next/router';
import { Dispatch, FC, SetStateAction } from 'react';

interface PropTypes {
  page: string;
  haveAds: boolean;
  searchMode: boolean;
  searchResultTotal: number;
  searchPagination: {
    get: {
      limit: number;
      skip: number;
    };
    set: Dispatch<
      SetStateAction<{
        limit: number;
        skip: number;
      }>
    >;
  };
}

const PaginationButtons: FC<PropTypes> = ({
  page,
  haveAds,
  searchMode,
  searchPagination,
  searchResultTotal,
}) => {
  return (
    <Container>
      <Grid container justifyContent={'center'} gap="10px">
        <Grid item>
          <Button
            variant="contained"
            sx={{
              color: '#fff',
              borderRadius: 3,
              backgroundImage:
                'linear-gradient(180deg, rgba(141,206,179,1) 0%, #12d685 74%)',
              textTransform: 'capitalize',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundImage:
                  'linear-gradient(180deg, #619781 0%, #12d685 74%)',
              },
            }}
            onClick={() => {
              if (searchMode) {
                searchPagination.set((perv) => ({
                  ...perv,
                  skip: perv.skip + 12,
                }));
              } else {
                if (!haveAds) return;
                router.push(`/?page=${parseInt(page) + 1}`);
              }
            }}
            id="btn"
            disabled={
              searchMode
                ? searchResultTotal < searchPagination.get.skip
                : !haveAds
            }
          >
            Next Page
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={searchMode ? searchPagination.get.skip === 0 : +page <= 0}
            sx={{
              color: '#fff',
              borderRadius: 3,
              backgroundImage:
                'linear-gradient(180deg, rgba(141,206,179,1) 0%, #12d685 74%)',
              textTransform: 'capitalize',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundImage:
                  'linear-gradient(180deg, #619781 0%, #12d685 74%)',
              },
            }}
            onClick={() => {
              if (searchMode) {
                if (!searchPagination.get.skip) {
                  return;
                }
                searchPagination.set((perv) => ({
                  ...perv,
                  skip: perv.skip - 12,
                }));
              } else {
                if (+page <= 0) {
                  return;
                } else {
                  router.push(`/?page=${parseInt(page) - 1}`);
                }
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

import { CircularProgress, Container, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import Ad from '../models/Ad';
import AdsSection from '../src/components/HomePage/AdsSection/AdsSection';
import Categories from '../src/components/HomePage/Categories/Categories.component';
import PaginationButtons from '../src/components/HomePage/PaginationButtons/PaginationButtons';
import PopularAd from '../src/components/HomePage/PopularAd/PopularAd';
import SearchSection from '../src/components/HomePage/SearchSection/SearchSection';
import Layout from '../src/components/Layout/Layout';
import { Context } from '../src/context';
import dbConnect from '../src/utils/dbConnect';
import { AdsType } from '../types/ad';
import { CategoryType } from '../types/category';

interface HomePagePropTypes {
  categories: CategoryType[];
  page: string;
  count: number;
  ads: AdsType[];
}

const index: FC<HomePagePropTypes> = ({ page, count, ads }) => {
  const { state, dispatch } = useContext(Context);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [searchResult, setSearchResult] = useState<AdsType[]>([]);
  const [searchPagination, setSearchPagination] = useState({
    limit: 12,
    skip: 0,
  });

  const [searchResultTotal, setSearchResultTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const paginationBtn = document.getElementById('first');
    if (paginationBtn && router.query.page) {
      paginationBtn.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.query]);

  return (
    <Layout title="Truck App">
      {/* search section */}
      <SearchSection
        categories={state.categories}
        setSearchResult={setSearchResult}
        searchPagination={searchPagination}
        setSearchPagination={setSearchPagination}
        searchResultTotal={{
          get: searchResultTotal,
          set: setSearchResultTotal,
        }}
      />
      {/* categories section */}
      <Container sx={{ padding: { lg: '20px 0', xs: '20px 11px' } }}>
        <Grid component="section" container spacing={2} alignItems="center">
          {state.categories?.length && !categoryLoader ? (
            state.categories?.map((cat) => {
              return (
                <Grid item lg={3} key={cat._id} xs={12}>
                  <Categories
                    name={cat.name}
                    image={cat.image}
                    adCount={cat.ads}
                  />
                </Grid>
              );
            })
          ) : (
            <CircularProgress size="60" />
          )}
        </Grid>
      </Container>
      {/* popular ads section */}
      <PopularAd />
      {/*  ads section */}
      <AdsSection ads={ads} searchResult={searchResult} />
      {/* pagination buttons */}
      <PaginationButtons
        page={page}
        haveAds={!!ads.length}
        searchMode={!!searchResult.length}
        searchPagination={{ get: searchPagination, set: setSearchPagination }}
        searchResultTotal={searchResultTotal}
      />
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 0 },
  req,
}) => {
  await dbConnect();
  const limit = 12;

  try {
    const countOfAllDocs = await Ad.estimatedDocumentCount();

    const ads = await Ad.find(
      { isApproved: true },
      {},
      { skip: (page as number) * limit, limit }
    ).sort({ createdAt: -1 });

    return {
      props: {
        ads: JSON.parse(JSON.stringify(ads)),
        page,
        count: countOfAllDocs,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

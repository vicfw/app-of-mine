import { CircularProgress, Container, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Ad from '../models/Ad';
import Category from '../models/Category';
import AdsSection from '../src/components/HomePage/AdsSection/AdsSection';
import Categories from '../src/components/HomePage/Categories/Categories.component';
import PaginationButtons from '../src/components/HomePage/PaginationButtons/PaginationButtons';
import PopularAd from '../src/components/HomePage/PopularAd/PopularAd';
import SearchSection from '../src/components/HomePage/SearchSection/SearchSection';
import Layout from '../src/components/Layout/Layout';
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
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryLoader, setCategoryLoader] = useState(false);

  useEffect(() => {
    setCategoryLoader(true);
    fetch('/api/category', {
      method: 'GET',
    }).then((res) =>
      res.json().then((data) => {
        setCategories(data.data);
        setCategoryLoader(false);
      })
    );
  }, []);

  const router = useRouter();

  useEffect(() => {
    const paginationBtn = document.getElementById('first');
    if (paginationBtn && router.query.page) {
      paginationBtn.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.query]);

  return (
    <Layout>
      {/* search section */}
      <SearchSection categories={categories} />
      {/* categories section */}
      <Container sx={{ padding: { lg: '20px 0', xs: '20px 11px' } }}>
        <Grid component="section" container spacing={2} alignItems="center">
          {categories?.length && !categoryLoader ? (
            categories?.map((cat) => {
              return (
                <Grid item lg={4} key={cat._id} xs={12}>
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
      <AdsSection ads={ads} />
      {/* pagination buttons */}
      <PaginationButtons page={page} haveAds={!!ads.length} />
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
      {},
      {},
      { skip: (page as number) * limit, limit }
    );

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

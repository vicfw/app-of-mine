import { Container, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Ad from '../models/Ad';
import Category from '../models/Category';
import AdsSection from '../src/components/HomePage/AdsSection/AdsSection';
import Categories from '../src/components/HomePage/Categories/Categories.component';
import PopularAd from '../src/components/HomePage/PopularAd/PopularAd';
import SearchSection from '../src/components/HomePage/SearchSection/SearchSection';
import Layout from '../src/components/Layout/Layout';
import dbConnect from '../src/utils/dbConnect';
import { AdsType } from '../types/ad';
import { CategoryType } from '../types/category';

interface HomePagePropTypes {
  categories: CategoryType[];
  page: number;
  count: number;
  ads: AdsType[];
}

const index: FC<HomePagePropTypes> = ({ categories, page, count, ads }) => {
  const router = useRouter();

  return (
    <Layout>
      {/* search section */}
      <SearchSection />
      {/* categories section */}
      <Container sx={{ padding: '20px 0' }}>
        <Grid component="section" container spacing={2}>
          {categories.map((cat) => {
            return (
              <Grid item lg={4} key={cat._id}>
                <Categories name={cat.name} image={cat.image} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {/* popular ads section */}
      <PopularAd />
      {/*  ads section */}
      <AdsSection ads={ads} />
      <button onClick={() => router.push(`/?page=${page + 1}`)}>up</button>
      <button onClick={() => router.push(`/?page=${page - 1}`)}>down</button>
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 0 },
}) => {
  await dbConnect();
  const limit = 10;

  // if (!page) {
  //   page = 1;
  // }

  try {
    const categories = await Category.find();

    const countOfAllDocs = await Ad.estimatedDocumentCount();

    const ads = await Ad.find(
      {},
      {},
      { skip: (page as number) * limit, limit }
    );

    console.log(ads, 'ads');
    console.log(countOfAllDocs, 'countOfAllDocs');

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        ads: JSON.parse(JSON.stringify(ads)),
        page,
        count: countOfAllDocs,
      },
    };
  } catch (e) {
    console.log(e, 'error');

    return {
      notFound: true,
    };
  }
};

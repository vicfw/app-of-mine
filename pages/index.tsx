import { Container, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import Category from '../models/Category';
import Categories from '../src/components/Categories/Categories.component';
import Layout from '../src/components/Layout/Layout';
import SearchSection from '../src/components/SearchSection/SearchSection';
import dbConnect from '../src/utils/dbConnect';
import { CategoryType } from '../types/category';

interface HomePagePropTypes {
  categories: CategoryType[];
}

const index: FC<HomePagePropTypes> = ({ categories }) => {
  return (
    <Layout>
      <SearchSection />
      <Container sx={{ padding: '20px 0' }}>
        <Grid container spacing={2}>
          {categories.map((cat) => {
            return (
              <Grid item lg={4} key={cat._id}>
                <Categories name={cat.name} image={cat.image} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  try {
    const categories = await Category.find();

    return {
      props: { categories: JSON.parse(JSON.stringify(categories)) },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

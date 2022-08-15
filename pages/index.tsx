import { FC } from 'react';
import Layout from '../src/components/Layout/Layout';
import SearchSection from '../src/components/SearchSection/SearchSection';

const index: FC<any> = ({}) => {
  return (
    <Layout>
      <SearchSection />
    </Layout>
  );
};
export default index;

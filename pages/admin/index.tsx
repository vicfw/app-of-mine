import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import AdminLayout from '../../src/components/Layout/adminLayout';

const Index: FC<any> = ({}) => {
  return <AdminLayout>Dashboard</AdminLayout>;
};
export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });

    if (!session?.user.isAdmin) {
      return {
        props: {},
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (e) {
    return { props: {} };
  }
};

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import AdminLayout from '../../src/components/Layout/adminLayout';

const Index: FC<any> = ({}) => {
  return <AdminLayout></AdminLayout>;
};
export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    await dbConnect();

    const session = await getSession({ req });

    console.log(session);

    if (!session?.user.isAdmin) {
      return {
        props: {},
        //   redirect: {
        //     destination: '/',
        //     permanent: false,
        //   },
      };
    } else {
      return {
        props: {},
        //   redirect: {
        //     destination: '/',
        //     permanent: false,
        //   },
      };
    }
  } catch (e) {
    return { props: {} };
  }
};

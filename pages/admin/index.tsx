import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import AdminLayout from '../../src/components/Layout/adminLayout';

const index: FC<any> = ({}) => {
  return <AdminLayout></AdminLayout>;
};
export default index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  console.log(session);

  if (session && !session.user.isAdmin) {
    return {
      props: {},
      //   redirect: {
      //     destination: '/',
      //     permanent: false,
      //   },
    };
  } else {
    return { props: {} };
  }
};

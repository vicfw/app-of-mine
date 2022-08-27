import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import AdminLayout from "../../src/components/Layout/adminLayout";

const Index: FC<any> = ({}) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/admin/login");
    } else if (session.data && !session.data.user.isAdmin) {
      router.replace("/admin/login");
    }
  }, [session]);

  if (session.status === "loading") return <h1>loading...</h1>;

  return <AdminLayout>Dashboard</AdminLayout>;
};
export default Index;

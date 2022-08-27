import { Box, Button, Container } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FC } from "react";
import ApprovalModal from "../../../src/components/ApprovalModal/ApprovalModal";
import AdminLayout from "../../../src/components/Layout/adminLayout";
import { useApprovedPage } from "../../../src/pageHooks/approved";
import style from "../../../src/styles/adminTable.module.css";

interface ApprovedProps {}

const Approved: FC<ApprovedProps> = () => {
  const { val, on, set } = useApprovedPage();

  return (
    <AdminLayout header="Approved Ads">
      <ApprovalModal
        openState={{
          open: val.deleteModalState,
          setOpen: set.setDeleteModalState,
        }}
        bodyText="Are You Sure To Delete ?"
        func={on.deleteAds}
      />
      <Container>
        <Box display="flex" justifyContent={"end"}>
          {" "}
          <Button
            sx={{ textTransform: "capitalizes", color: "#fff" }}
            variant="contained"
            onClick={() => on.canDelete() && set.setDeleteModalState(true)}
            disabled={!on.canDelete()}
          >
            Delete Ad(s)
          </Button>
        </Box>
        <table width="100%" className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Title</th>
              <th>createdAt</th>
              <th>Popular Ad</th>
            </tr>
          </thead>
          <tbody>
            {val.tableData.map((dt, index) => {
              return (
                <tr key={dt.id}>
                  <td className={style.td}>
                    <input
                      type="checkbox"
                      checked={dt.isSelected}
                      onChange={(e) => {
                        set.setTableData((perv) => {
                          return perv.map((p) => {
                            if (p.id === dt.id) {
                              p.isSelected = e.target.checked;
                            }
                            return p;
                          });
                        });
                      }}
                    />
                  </td>
                  <td className={style.td}>{index + 1}</td>
                  <td className={style.td}>{dt.title}</td>
                  <td className={style.td}>
                    {format(dt.createdAt, "yyy/MM/dd")}
                  </td>
                  <td className={style.td}>
                    <Button
                      variant="contained"
                      sx={{ color: "#fff" }}
                      color={dt.isPop ? "error" : "primary"}
                      onClick={() => {
                        on.changePopularity(
                          dt.id,
                          dt.isPop ? { isPopular: false } : { isPopular: true }
                        );
                      }}
                    >
                      {dt.isPop ? "Popular" : "Not Popular"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Box display={"flex"} justifyContent="center" width="%100" mt={1}>
          <Button
            sx={{ color: "#fff" }}
            variant="contained"
            onClick={() =>
              set.setPagination((perv) => ({
                ...perv,
                skip: val.tableData.length,
              }))
            }
            disabled={val.tableData.length >= val.totalAds}
          >
            Load More...
          </Button>
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default Approved;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });

    if (session?.user.isAdmin) {
      return {
        props: {},
      };
    } else {
      return {
        props: {},
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
  } catch (e) {
    return { props: {} };
  }
};

import { Box, Button, Container } from '@mui/material';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import ApprovalModal from '../../../src/components/ApprovalModal/ApprovalModal';
import AdminLayout from '../../../src/components/Layout/adminLayout';
import { useNotApprovedPage } from '../../../src/pageHooks/not-approved';
import style from '../../../src/styles/adminTable.module.css';
import { AdsType } from '../../../types/ad';

interface NotApprovedProps {
  ads?: AdsType[];
}

const NotApproved: FC<NotApprovedProps> = () => {
  const { val, set, on } = useNotApprovedPage();

  return (
    <AdminLayout header="Not Approved Ads">
      <ApprovalModal
        openState={{
          open: val.approveModalState,
          setOpen: set.setApproveModalState,
        }}
        bodyText="Are You Sure To Approve Ad(s) ?"
        func={on.updateAds}
      />
      <Container>
        <Box display="flex" justifyContent={'end'}>
          {' '}
          <Button
            sx={{ textTransform: 'capitalizes', color: '#fff' }}
            variant="contained"
            onClick={() => on.canUpdate() && set.setApproveModalState(true)}
            disabled={!on.canUpdate()}
          >
            Approve Ad(s)
          </Button>
        </Box>
        <table width="100%" className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th>NO.</th>
              <th>Title</th>
              <th>CreatedAt</th>
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
                    {format(dt.createdAt, 'yyy/MM/dd')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Box display={'flex'} justifyContent="center" width="%100" mt={1}>
          <Button
            sx={{ color: '#fff' }}
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
export default NotApproved;

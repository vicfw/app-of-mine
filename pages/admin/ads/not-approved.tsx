import { Box, Button, Container } from '@mui/material';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import AdminLayout from '../../../src/components/Layout/adminLayout';
import style from '../../../src/styles/adminTable.module.css';
import { AdsType } from '../../../types/ad';

interface NotApprovedProps {
  ads?: AdsType[];
}

const NotApproved: FC<NotApprovedProps> = () => {
  const [tableData, setTableData] = useState<
    | {
        id: string;
        title: string;
        isSelected: boolean;
        createdAt: Date;
      }[]
    | []
  >([]);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [totalAds, setTotalAds] = useState(0);

  const fetchAds = async () => {
    const res = await fetch(
      `/api/admin/not-approved?skip=${pagination.skip}&limit=${pagination.limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const result: { success: boolean; data: AdsType[]; total: number } =
      await res.json();

    if (result.success) {
      const mappedAds = result.data.map((ad) => {
        return {
          id: ad._id,
          title: ad.title,
          isSelected: false,
          createdAt: new Date(ad.createdAt),
        };
      });

      setTableData((perv) => [...perv, ...mappedAds]);
      setTotalAds(result.total);
    }
  };

  const updateAds = async () => {
    const body = tableData.filter((dt) => dt.isSelected).map((bd) => bd.id);

    const res = await fetch('/api/admin/not-approved?hello=farid', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result: { success: boolean; data: AdsType[] } = await res.json();

    if (result.success) {
      setTableData((perv) => {
        return perv.filter((p) => !p.isSelected);
      });
    }
  };

  useEffect(() => {
    fetchAds();
  }, [pagination]);

  return (
    <AdminLayout header="Not Approved Ads">
      <Container>
        <Box display="flex" justifyContent={'end'}>
          {' '}
          <Button
            sx={{ textTransform: 'capitalizes', color: '#fff' }}
            variant="contained"
            onClick={updateAds}
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
            {tableData.map((dt, index) => {
              return (
                <tr key={dt.id}>
                  <td className={style.td}>
                    <input
                      type="checkbox"
                      checked={dt.isSelected}
                      onChange={(e) => {
                        setTableData((perv) => {
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
              setPagination((perv) => ({
                ...perv,
                skip: tableData.length,
              }))
            }
            disabled={tableData.length >= totalAds}
          >
            Load More...
          </Button>
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default NotApproved;

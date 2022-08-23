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
  const [tableData, setTableData] = useState([
    {
      id: '',
      title: '',
      isSelected: false,
      createdAt: new Date(),
    },
  ]);

  const fetchAds = async () => {
    const res = await fetch('/api/admin/approved?hello=farid', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const result: { success: boolean; data: AdsType[] } = await res.json();

    if (result.success) {
      const mappedAds = result.data.map((ad) => {
        return {
          id: ad._id,
          title: ad.title,
          isSelected: false,
          createdAt: new Date(ad.createdAt),
        };
      });

      setTableData(mappedAds);
    }
  };

  const deleteAds = async () => {
    const body = tableData.filter((dt) => dt.isSelected).map((bd) => bd.id);

    const res = await fetch('/api/admin/not-approved?hello=farid', {
      method: 'DELETE',
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
  }, []);

  return (
    <AdminLayout header="Approved Ads">
      <Container>
        <Box display="flex" justifyContent={'end'}>
          {' '}
          <Button
            sx={{ textTransform: 'capitalizes', color: '#fff' }}
            variant="contained"
            onClick={deleteAds}
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
            </tr>
          </thead>
          <tbody>
            {tableData.map((dt, index) => {
              return (
                <tr>
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
      </Container>
    </AdminLayout>
  );
};
export default NotApproved;

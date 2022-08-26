import { Container } from '@mui/system';
import format from 'date-fns/format';
import Image from 'next/image';
import { FC } from 'react';
import AdminLayout from '../../src/components/Layout/adminLayout';
import { useCategoriesPage } from '../../src/pageHooks/categories';
import style from '../../src/styles/adminTable.module.css';

const Categories: FC<any> = ({}) => {
  const { val, set } = useCategoriesPage();

  return (
    <AdminLayout header="Categories">
      <Container>
        <table width="100%" className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>createdAt</th>
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
                  <td className={style.td}>
                    <Image width={60} height={60} src={dt.image} />
                  </td>
                  <td className={style.td}>{dt.name}</td>
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
export default Categories;

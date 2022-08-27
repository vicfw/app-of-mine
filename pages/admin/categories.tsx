import { Box, Button, Grid, Input, TextField } from '@mui/material';
import { Container } from '@mui/system';
import format from 'date-fns/format';
import Image from 'next/image';
import { FC } from 'react';
import ApprovalModal from '../../src/components/ApprovalModal/ApprovalModal';
import AdminLayout from '../../src/components/Layout/adminLayout';
import { useCategoriesPage } from '../../src/pageHooks/categories';
import style from '../../src/styles/adminTable.module.css';

const Categories: FC<any> = ({}) => {
  const { val, set, on } = useCategoriesPage();

  return (
    <AdminLayout header="Categories">
      {/* edit modal */}
      <ApprovalModal
        openState={{ open: val.openEditModal, setOpen: set.setOpenEditModal }}
        bodyText="Edit Category"
        func={on.editHandler}
      >
        <Container>
          <Grid container display="flex" justifyContent={'flex-start'}>
            <Grid item lg={12}>
              <TextField
                label="Title"
                value={val.editState.name}
                size="small"
                sx={{
                  justifyContent: 'center',
                  width: '100%',
                  '& .MuiFormHelperText-root': {
                    color: 'red',
                    margin: 0,
                    marginTop: '5px',
                  },
                }}
                helperText={val.errorState.name}
                error={!!val.errorState.name}
                onChange={(e) => {
                  set.setEditState((perv) => ({
                    ...perv,
                    name: e.target.value,
                  }));

                  set.setErrorState((perv) => ({ ...perv, name: '' }));
                }}
              />
            </Grid>
            <Grid container my={2} justifyContent="space-between">
              <Grid item lg={6}>
                <Input
                  type="file"
                  onChange={on.onFileUploadChange}
                  error={!!val.errorState.image}
                />
              </Grid>
              <Grid item lg={6} display="flex" justifyContent={'center'}>
                <Image src={val.editState.image || ''} width={50} height={50} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ApprovalModal>
      {/* create category modal */}
      <ApprovalModal
        openState={{
          open: val.openCreateModal,
          setOpen: set.setOpenCreateModal,
        }}
        bodyText="Create Category"
        func={on.createHandler}
      >
        <Container>
          <Grid container display="flex" justifyContent={'flex-start'}>
            <Grid item lg={12}>
              <TextField
                label="Title"
                value={val.editState.name}
                size="small"
                sx={{
                  justifyContent: 'center',
                  width: '100%',
                  '& .MuiFormHelperText-root': {
                    color: 'red',
                    margin: 0,
                    marginTop: '5px',
                  },
                }}
                helperText={val.errorState.name}
                error={!!val.errorState.name}
                onChange={(e) => {
                  set.setEditState((perv) => ({
                    ...perv,
                    name: e.target.value,
                  }));

                  set.setErrorState((perv) => ({ ...perv, name: '' }));
                }}
              />
            </Grid>
            <Grid container my={2} justifyContent="space-between">
              <Grid item lg={6}>
                <Input
                  type="file"
                  onChange={on.onFileUploadChange}
                  error={!!val.errorState.image}
                />
              </Grid>
              <Grid item lg={6} display="flex" justifyContent={'center'}>
                <Image src={val.editState.image || ''} width={50} height={50} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ApprovalModal>
      {/* delete modal */}
      <ApprovalModal
        openState={{
          open: val.deleteModalState,
          setOpen: set.setDeleteModalState,
        }}
        bodyText="Are You Sure To Delete ?"
        func={on.deleteHandler}
      />
      <Container>
        <Box display="flex" justifyContent={'end'} my={1}>
          <Button
            sx={{ textTransform: 'capitalizes', color: '#fff' }}
            variant="contained"
            onClick={() => {
              set.setEditState({ id: '', name: '', image: '' });
              set.setOpenCreateModal(true);
            }}
          >
            Create Category
          </Button>
        </Box>
        <table width="100%" className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>createdAt</th>
              <th>Actions</th>
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
                  <td className={style.td}>
                    <Box display="flex" gap="20px" justifyContent={'center'}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ color: '#fff' }}
                        onClick={() => on.onClickEditButton(dt.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ color: '#fff' }}
                        onClick={() => {
                          set.setEditState((perv) => ({ ...perv, id: dt.id }));
                          set.setDeleteModalState(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
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
            disabled={val.tableData.length >= val.totalCategories}
          >
            Load More...
          </Button>
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default Categories;

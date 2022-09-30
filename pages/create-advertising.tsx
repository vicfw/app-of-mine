import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import Category from '../models/Category';
import Layout from '../src/components/Layout/Layout';
import { useCreateAdvertising } from '../src/pageHooks/create-advertising';
import { cities as citiesArray } from '../src/utils/cities';
import { Colors } from '../src/utils/colors';
import dbConnect from '../src/utils/dbConnect';
import { CategoryType } from '../types/category';

interface createAdvertisingPropTypes {
  categories: CategoryType[];
}

const createAdvertising: FC<createAdvertisingPropTypes> = ({ categories }) => {
  const { get, set, on } = useCreateAdvertising();

  const cities: string[] = useMemo(() => {
    return citiesArray;
  }, []);

  return (
    <Layout title="Truck | Create Ad">
      <Container>
        <Grid container py={8} spacing={2}>
          {/* form */}
          <Grid item lg={6} xs={12}>
            <Typography
              component="h3"
              fontSize={30}
              sx={{
                fontWeight: 'bold',
                marginBottom: 1,
                fontSize: { xs: '25px', md: '30px' },
                textAlign: { xs: 'center', md: 'left' },
              }}
              color={Colors.grey.dark}
            >
              Advertisement Registration
            </Typography>
            <Paper
              sx={{
                backgroundColor: '#f9f9f9',
                padding: '20px 40px 0px 40px',
                borderRadius: '10px',
                boxShadow: '2px 5px 5px #b3b3b3 ',
              }}
            >
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.dark,
                  }}
                >
                  Equipment Type
                </Typography>
                <Select
                  defaultValue={'select'}
                  sx={{ '& .MuiSelect-select': { color: Colors.grey.dark } }}
                  onChange={on.onChangeInputs}
                  name="category"
                  error={!!get.errorString.category}
                  value={get.createAd.category}
                >
                  <MenuItem value={'select'} disabled>
                    Select
                  </MenuItem>

                  {categories.map((cat) => {
                    return (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Typography
                  sx={{
                    color: 'red',
                    margin: '5px 0 0 10px',
                    fontSize: '0.75rem',
                  }}
                >
                  {get.errorString.category}
                </Typography>
              </Box>
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.dark,
                  }}
                >
                  Ad title
                </Typography>
                <TextField
                  placeholder="Choose a suitable title for your ad"
                  onChange={on.onChangeInputs}
                  name="title"
                  error={!!get.errorString.title}
                  helperText={get.errorString.title}
                  value={get.createAd.title}
                />
              </Box>
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.dark,
                  }}
                >
                  Description
                </Typography>
                <TextField
                  multiline
                  rows="3"
                  placeholder="Choose a suitable title for your ad"
                  onChange={on.onChangeInputs}
                  name="description"
                  error={!!get.errorString.description}
                  helperText={get.errorString.description}
                  value={get.createAd.description}
                />
              </Box>
              {/* phone number input */}
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.dark,
                  }}
                >
                  Phone
                </Typography>
                <TextField
                  placeholder="Enter a phone number for your ad"
                  onChange={on.onChangeInputs}
                  name="phone"
                  type="number"
                  error={!!get.errorString.phone}
                  helperText={get.errorString.phone}
                  value={get.createAd.phone}
                />
              </Box>
              {/*  CITY/ADDRESS select box */}
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.dark,
                  }}
                >
                  CITY/ADDRESS
                </Typography>
                <Select
                  defaultValue={'select'}
                  sx={{ '& .MuiSelect-select': { color: Colors.grey.dark } }}
                  onChange={on.onChangeInputs}
                  name="city"
                  error={!!get.errorString.city}
                  value={get.createAd.city}
                >
                  <MenuItem value={'select'}>Select</MenuItem>

                  {cities.map((ct) => (
                    <MenuItem key={ct} value={ct}>
                      {ct}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  sx={{
                    color: 'red',
                    margin: '5px 0 0 10px',
                    fontSize: '0.75rem',
                  }}
                >
                  {get.errorString.city}
                </Typography>
              </Box>

              <RadioGroup row>
                <FormControlLabel
                  value="person"
                  control={<Radio />}
                  label="Person"
                  onChange={on.onChangeInputs}
                  name="organization"
                  checked={get.createAd.organization === 'person'}
                />
                <FormControlLabel
                  value="company"
                  control={<Radio />}
                  label="Company/Store"
                  onChange={on.onChangeInputs}
                  name="organization"
                  checked={get.createAd.organization === 'company'}
                />
              </RadioGroup>
            </Paper>
          </Grid>
          {/* upload section */}
          <Grid item md={6}>
            <Box>
              <Typography
                component="h2"
                onClick={on.clearTheForm}
                sx={{
                  marginBottom: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  height: 45,
                  cursor: 'pointer',
                  fontSize: { xs: '18px', md: '25px' },
                }}
                color="#01c23d"
              >
                Clear the form
              </Typography>
            </Box>

            <Paper
              sx={{
                backgroundColor: '#f9f9f9',
                padding: '20px 40px 0px 40px',
                borderRadius: '10px',
                boxShadow: '2px 5px 5px #b3b3b3 ',
              }}
            >
              <Typography
                component="h3"
                fontSize={30}
                fontWeight="bold"
                color={Colors.grey.dark}
                sx={{
                  fontSize: { xs: '22px', md: '30px' },
                  textAlign: { xs: 'center', md: 'left' },
                  marginBottom: { xs: '10px' },
                }}
              >
                Advertisement photo
              </Typography>
              {/* photo inputs */}
              <Grid container spacing={2} sx={{ marginLeft: { xs: 0 } }}>
                <Grid item>
                  <Box
                    onClick={() => get.inputRef.current?.click()}
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid #01c23d`,
                      borderRadius: '8px',
                      cursor: !!get.loading.some((load) => load)
                        ? 'not-allowed'
                        : 'pointer',
                    }}
                  >
                    <input
                      hidden
                      ref={get.inputRef}
                      disabled={get.loading.some((load) => load)}
                      type="file"
                      onChange={on.onFileUploadChange}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AddIcon sx={{ color: '#01c23d' }} />
                      <Typography
                        sx={{ color: '#01c23d', fontSize: '1rem' }}
                        component={'p'}
                      >
                        Add Photo
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${Colors.grey.dark}`,
                      borderRadius: '8px',
                    }}
                  >
                    {get.loading[0] ? (
                      <CircularProgress />
                    ) : get.previewUrls[0] ? (
                      <Image
                        src={get.previewUrls[0]}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <CameraAltIcon />
                    )}
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${Colors.grey.dark}`,
                      borderRadius: '8px',
                    }}
                  >
                    {get.loading[1] ? (
                      <CircularProgress />
                    ) : get.previewUrls[1] ? (
                      <Image
                        src={get.previewUrls[1]}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <CameraAltIcon />
                    )}
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${Colors.grey.dark}`,
                      borderRadius: '8px',
                    }}
                  >
                    {get.loading[2] ? (
                      <CircularProgress />
                    ) : get.previewUrls[2] ? (
                      <Image
                        src={get.previewUrls[2]}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <CameraAltIcon />
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Typography
                sx={{
                  color: 'red',
                  margin: '5px 0 0 0',
                  fontSize: '0.75rem',
                }}
              >
                {get.errorString.images}
              </Typography>

              <Typography
                component="p"
                fontWeight="bold"
                color={Colors.grey.dark}
                mt={1}
              >
                A picture is better than a thousand words By placing photo,
                <Typography component="span" color={Colors.grey.dark}>
                  increase the chance of your add being seen 5 times
                </Typography>
              </Typography>
              <Box display={'flex'} justifyContent="center">
                <Box
                  display={'flex'}
                  justifyContent="center"
                  sx={{
                    '& .image': { top: '84px !important' },
                    marginTop: '-29px',
                  }}
                >
                  <Image
                    src="/camera-phone.png"
                    width={345}
                    height={345}
                    className="image"
                  />
                </Box>
              </Box>
            </Paper>
            <Typography component="p" color={Colors.grey.dark} mt={2}>
              by clicking the ad registration button , you agree to the sites's
              <Link href={'/privacy-policy'} prefetch={false}>
                <Typography
                  component="span"
                  color={'#01c23d'}
                  sx={{ cursor: 'pointer' }}
                >
                  {' '}
                  terms and conditions
                </Typography>
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={1}>
              {get.submitLoading ? (
                <Button
                  variant="contained"
                  sx={{ color: '#fff' }}
                  endIcon={<CircularProgress sx={{ color: '#fff' }} />}
                  size="small"
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={on.createAdHandler}
                  onMouseDown={on.errorHandler}
                  sx={{ color: '#fff' }}
                >
                  ADD
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <div>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={get.toast}
            autoHideDuration={3000}
            onClose={() => set.setToast(false)}
            message={get.errorString.fail}
            key={1}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'red',
              },
              '& .MuiSnackbarContent-message': {
                fontSize: 15,
              },
            }}
          />
        </div>
      </Container>
    </Layout>
  );
};
export default createAdvertising;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  try {
    const categories = await Category.find();

    return {
      props: { categories: JSON.parse(JSON.stringify(categories)) },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

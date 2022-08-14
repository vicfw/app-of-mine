import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import errors from 'formidable/FormidableError';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { ChangeEvent, FC, useRef, useState } from 'react';
import Category from '../models/Category';
import Layout from '../src/components/Layout/Layout';
import { Colors } from '../src/utils/colors';
import { CategoryType } from '../types/category';

interface createAdvertisingPropTypes {
  categories: CategoryType[];
}

const createAdvertising: FC<createAdvertisingPropTypes> = ({ categories }) => {
  const createAdInitialState: {
    title: string;
    category: string;
    phone: string;
    description: string;
    images: { img: string }[];
    city: string;
    organization: string;
  } = {
    title: '',
    category: 'select',
    phone: '',
    description: '',
    images: [],
    city: 'select',
    organization: 'person',
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [createAd, setCreateAd] = useState(createAdInitialState);

  const [errorString, setErrorString] = useState({
    title: '',
    category: '',
    phone: '',
    description: '',
    images: '',
    city: '',
  });

  console.log(createAd, 'createAd');

  const onChangeInputs = (e: any) => {
    setCreateAd((perv) => ({ ...perv, [e.target.name]: e.target.value }));
    setErrorString((perv) => ({ ...perv, [e.target.name]: '' }));
  };

  const onFileUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];

    let formData = new FormData();
    formData.append('media', file);

    /** File validation */
    if (!file.type.startsWith('image')) {
      return;
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const {
      data,
      error,
    }: {
      data: {
        url: string;
      } | null;
      error: string | null;
    } = await res.json();

    console.log(data, error);

    /** Setting file state */

    if (data) {
      setCreateAd((perv) => ({
        ...perv,
        images: [...perv.images, { img: data.url }],
      }));

      setErrorString((perv) => ({ ...perv, images: '' }));

      setPreviewUrls((perv) => {
        return [...perv, URL.createObjectURL(file)];
      });
    }

    /** Reset file input */
    e.target.type = 'text';
    e.target.type = 'file';
  };

  const errorHandler = () => {
    let errors: any = {};
    let f: keyof typeof createAd;
    for (f in createAd) {
      if (!createAd[f]) {
        errors[f] = `${f} of a ad cant be empty `;
      }

      if (typeof createAd[f] === 'object' && !createAd[f].length) {
        errors[f] = `${f} of a ad cant be empty `;
      }
    }

    setErrorString(errors as any);

    if (createAd.title.length < 4) {
      setErrorString((perv) => ({
        ...perv,
        title: 'title of a ad cant be less than 4 characters',
      }));
    }

    if (createAd.phone.length < 9) {
      setErrorString((perv) => ({
        ...perv,
        phone: 'phone of an ad should have more than 9 numbers',
      }));
    }
  };

  const createAdHandler = async () => {
    const values = Object.values(errorString);

    const haveError = values.some((err) => err);

    console.log(haveError, 'haveError');

    if (haveError) return;

    const response = await fetch('/api/ad', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createAd),
    });

    const data = await response.json();

    if (data.success) {
      console.log(data);
    } else {
      console.log(data);
    }

    console.log(data, 'the data');
  };

  const clearTheForm = () => {
    setCreateAd({
      title: '',
      category: 'select',
      phone: '',
      description: '',
      images: [],
      city: 'select',
      organization: 'person',
    });
    setPreviewUrls([]);
  };

  return (
    <Layout>
      <Container>
        <Grid container py={8} spacing={2}>
          {/* form */}
          <Grid item md={6}>
            <Typography
              component="h3"
              fontSize={30}
              sx={{ fontWeight: 'bold', marginBottom: 1 }}
              color={Colors.grey.dark}
            >
              Advertisement Registration
            </Typography>
            <Paper
              sx={{
                backgroundColor: '#efefef',
                padding: '20px 40px',
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
                  Grouping
                </Typography>
                <Select
                  defaultValue={'select'}
                  sx={{ '& .MuiSelect-select': { color: Colors.grey.dark } }}
                  onChange={onChangeInputs}
                  name="category"
                  error={!!errorString.category}
                  value={createAd.category}
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
                  {errorString.category}
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
                  onChange={onChangeInputs}
                  name="title"
                  error={!!errorString.title}
                  helperText={errorString.title}
                  value={createAd.title}
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
                  onChange={onChangeInputs}
                  name="description"
                  error={!!errorString.description}
                  helperText={errorString.description}
                  value={createAd.description}
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
                  onChange={onChangeInputs}
                  name="phone"
                  type="number"
                  error={!!errorString.phone}
                  helperText={errorString.phone}
                  value={createAd.phone}
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
                  onChange={onChangeInputs}
                  name="city"
                  error={!!errorString.city}
                  value={createAd.city}
                >
                  <MenuItem value={'select'}>Select</MenuItem>
                  <MenuItem value={'10'}>Ten</MenuItem>
                  <MenuItem value={'20'}>Twenty</MenuItem>
                  <MenuItem value={'30'}>Thirty</MenuItem>
                </Select>
                <Typography
                  sx={{
                    color: 'red',
                    margin: '5px 0 0 10px',
                    fontSize: '0.75rem',
                  }}
                >
                  {errorString.city}
                </Typography>
              </Box>

              <RadioGroup row>
                <FormControlLabel
                  value="person"
                  control={<Radio />}
                  label="Person"
                  onChange={onChangeInputs}
                  name="organization"
                  checked={createAd.organization === 'person'}
                />
                <FormControlLabel
                  value="company"
                  control={<Radio />}
                  label="Company/Store"
                  onChange={onChangeInputs}
                  name="organization"
                  checked={createAd.organization === 'company'}
                />
              </RadioGroup>
            </Paper>
          </Grid>
          {/* upload section */}
          <Grid item md={6}>
            <Box sx={{}}>
              <Typography
                component="h2"
                fontSize={20}
                onClick={clearTheForm}
                sx={{
                  marginBottom: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  height: 45,
                  cursor: 'pointer',
                }}
                color={Colors.primary.dark}
              >
                Clear the form
              </Typography>
            </Box>

            <Paper
              sx={{
                backgroundColor: '#efefef',
                padding: '20px 40px',
                borderRadius: '10px',
                boxShadow: '2px 5px 5px #b3b3b3 ',
              }}
            >
              <Typography
                component="h3"
                fontSize={30}
                fontWeight="bold"
                color={Colors.grey.dark}
              >
                Advertisment photo
              </Typography>
              {/* photo inputs */}
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    onClick={() => inputRef.current?.click()}
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${Colors.primary.dark}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      hidden
                      ref={inputRef}
                      type="file"
                      onChange={onFileUploadChange}
                    />
                    <AddIcon />
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
                    {previewUrls[0] ? (
                      <Image src={previewUrls[0]} width={100} height={100} />
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
                    {previewUrls[1] ? (
                      <Image src={previewUrls[1]} width={100} height={100} />
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
                    {previewUrls[2] ? (
                      <Image src={previewUrls[2]} width={100} height={100} />
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
                {errorString.images}
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
            </Paper>
            <Typography component="p" color={Colors.grey.dark} mt={2}>
              by clicking the ad registration button , you agree to the sites's
              <Typography component="span" color={Colors.primary.main}>
                terms and conditions
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={1}>
              <Button
                variant="contained"
                onClick={createAdHandler}
                onMouseDown={errorHandler}
              >
                ADD
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default createAdvertising;

export const getServerSideProps: GetServerSideProps = async (context) => {
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

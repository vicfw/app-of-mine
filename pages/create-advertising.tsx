import styled from '@emotion/styled';
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
import { FC } from 'react';
import Layout from '../src/components/Layout/Layout';
import { Colors } from '../src/utils/colors';
import AddIcon from '@mui/icons-material/Add';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const createAdvertising: FC<any> = ({}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#ccc',
    padding: '20px 40px',
    borderRadius: '10px',
    boxShadow: '2px 5px 5px #b3b3b3 ',
  }));

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
            <Item>
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.main,
                  }}
                >
                  Grouping
                </Typography>
                <Select
                  defaultValue={'select'}
                  sx={{ '& .MuiSelect-select': { color: Colors.grey.main } }}
                >
                  <MenuItem value={'select'}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Box>
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.main,
                  }}
                >
                  Ad title
                </Typography>
                <TextField placeholder="Choose a suitable title for your ad" />
              </Box>
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.main,
                  }}
                >
                  Ad title
                </Typography>
                <TextField
                  multiline
                  rows="3"
                  placeholder="Choose a suitable title for your ad"
                />
              </Box>
              {/*  CITY/ADDRESS select box */}
              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.main,
                  }}
                >
                  CITY/ADDRESS
                </Typography>
                <Select
                  defaultValue={'select'}
                  sx={{ '& .MuiSelect-select': { color: Colors.grey.main } }}
                >
                  <MenuItem value={'select'}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Box>

              <RadioGroup row>
                <FormControlLabel
                  value="person"
                  control={<Radio />}
                  label="Person"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Company/Store"
                />
              </RadioGroup>
            </Item>
          </Grid>
          {/* upload section */}
          <Grid item md={6}>
            <Box sx={{}}>
              <Typography
                component="h2"
                fontSize={20}
                sx={{
                  marginBottom: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  height: 45,
                }}
                color={Colors.primary.main}
              >
                Clear the form
              </Typography>
            </Box>

            <Item>
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
                    sx={{
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${Colors.primary.main}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <input hidden />
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
                      border: `1px solid ${Colors.grey.light}`,
                      borderRadius: '8px',
                    }}
                  >
                    <CameraAltIcon />
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
                      border: `1px solid ${Colors.grey.light}`,
                      borderRadius: '8px',
                    }}
                  >
                    <CameraAltIcon />
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
                      border: `1px solid ${Colors.grey.light}`,
                      borderRadius: '8px',
                    }}
                  >
                    <CameraAltIcon />
                  </Box>
                </Grid>
              </Grid>

              <Typography
                component="p"
                fontWeight="bold"
                color={Colors.grey.main}
                mt={1}
              >
                A picture is better than a thousand words By placing photo,
                <Typography component="span" color={Colors.grey.dark}>
                  increase the chance of your add being seen 5 times
                </Typography>
              </Typography>
            </Item>
            <Typography component="p" color={Colors.grey.dark} mt={2}>
              by clicking the ad registration button , you agree to the sites's
              <Typography component="span" color={Colors.primary.main}>
                terms and conditions
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={1}>
              <Button variant="contained">ADD</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default createAdvertising;

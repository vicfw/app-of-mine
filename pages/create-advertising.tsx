import styled from '@emotion/styled';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { FC } from 'react';
import Layout from '../src/components/Layout/Layout';
import { Colors } from '../src/utils/colors';

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
        <Grid container py={8}>
          <Grid md={6}>
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

              <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  mb={1}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: Colors.grey.main,
                  }}
                >
                  Place
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
            </Item>
          </Grid>

          <Grid md={6}>dd</Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default createAdvertising;

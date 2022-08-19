import { Box, Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { FC } from 'react';

const SearchSection: FC<any> = ({}) => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/bc-search.jpg')",
        backgroundPosition: 'center center',
        minHeight: '75vh',
        maxHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ padding: '15px' }}>
        <Box sx={{ display: 'flex', border: '1px solid #ccc' }}>
          <TextField
            placeholder="Search"
            sx={{ '& MuiInputBase-root': { borderRadius: 0 } }}
          />
          <Select defaultValue={'select'} sx={{ borderRadius: 0 }}>
            <MenuItem value={'select'} disabled>
              All Applications
            </MenuItem>
          </Select>
          <Select defaultValue={'select'} sx={{ borderRadius: 0 }}>
            <MenuItem value={'select'} disabled>
              All Makes
            </MenuItem>
          </Select>
          <Button
            variant="contained"
            sx={{
              backgroundColor: (theme) => `${theme.palette.info.light}`,
              textTransform: 'capitalize',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: (theme) => `${theme.palette.info.main}`,
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default SearchSection;

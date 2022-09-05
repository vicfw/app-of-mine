import { Box, Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { FC, useRef, useState } from 'react';
import { CategoryType } from '../../../../types/category';

interface SearchSectionPropTypes {
  categories: CategoryType[];
}

const SearchSection: FC<SearchSectionPropTypes> = ({ categories }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryId, setCategoryId] = useState('');

  const handleSearch = () => {
    fetch('/api/ad/search', {
      method: 'POST',
      body: JSON.stringify({
        text: inputRef.current!.value,
        category: categoryId,
      }),
    }).then((res) =>
      res.json().then((data) => {
        inputRef.current!.value = '';
      })
    );
  };

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
        <Box
          sx={{
            display: 'flex',
            border: '1px solid #ccc',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <TextField
            placeholder="Search"
            sx={{ '& .MuiInputBase-root': { borderRadius: 0 } }}
            ref={inputRef}
            onChange={(e) => (inputRef.current!.value = e.target.value)}
          />
          <Select
            defaultValue={'select'}
            sx={{ borderRadius: 0 }}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value={'select'} disabled>
              All Applications
            </MenuItem>
            {categories.length &&
              categories.map((cat) => {
                return <MenuItem value={cat._id}>{cat.name}</MenuItem>;
              })}
          </Select>
          <Select defaultValue={'select'} sx={{ borderRadius: 0 }}>
            <MenuItem value={'select'} disabled>
              All Makes
            </MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleSearch}
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

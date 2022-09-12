import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AdsType } from '../../../../types/ad';
import { CategoryType } from '../../../../types/category';
import { cities as citiesArray } from '../../../utils/cities';

interface SearchSectionPropTypes {
  categories: CategoryType[] | null;
  setSearchResult: Dispatch<SetStateAction<AdsType[]>>;
  searchResultTotal: {
    get: number;
    set: Dispatch<SetStateAction<number>>;
  };
  searchPagination: { limit: number; skip: number };
  setSearchPagination: Dispatch<
    SetStateAction<{
      limit: number;
      skip: number;
    }>
  >;
}

const SearchSection: FC<SearchSectionPropTypes> = ({
  categories,
  setSearchResult,
  searchResultTotal,
  searchPagination,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryId, setCategoryId] = useState('');
  const [cityName, setCityName] = useState('');
  const [notFoundMassage, setNotFoundMassage] = useState('');

  const cities: string[] = useMemo(() => {
    return citiesArray;
  }, []);

  const handleSearch = () => {
    if (!inputRef.current!.value && !categoryId && !cityName) {
      setNotFoundMassage('please enter a field');
      return;
    }
    fetch(
      `/api/ad/search?limit=${searchPagination.limit}&skip=${searchPagination.skip}`,
      {
        method: 'POST',
        body: JSON.stringify({
          text: inputRef.current!.value,
          category: categoryId,
          city: cityName,
        }),
      }
    ).then((res) =>
      res.json().then((data) => {
        if (data?.data?.length) {
          setSearchResult(data.data);
          const paginationBtn = document.getElementById('first');
          if (paginationBtn) {
            paginationBtn.scrollIntoView({ behavior: 'smooth' });
          }
          setNotFoundMassage('');
          searchResultTotal.set(data.total);
        } else {
          setNotFoundMassage("we couldn't find you any ad");
          setCategoryId('');
          inputRef.current!.value = '';
        }
      })
    );
  };

  useEffect(() => {
    if (searchResultTotal.get > 0) handleSearch();
  }, [searchPagination]);

  return (
    <Box
      sx={{
        backgroundImage: "url('/bc-search.jpg')",
        backgroundPosition: 'center center',
        minHeight: '75vh',
        backgroundSize: 'cover',
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
            {categories?.length &&
              categories?.map((cat) => {
                return (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                );
              })}
          </Select>
          <Select
            defaultValue={'select'}
            sx={{ borderRadius: 0 }}
            onChange={(e) => setCityName(e.target.value)}
          >
            <MenuItem value={'select'} disabled>
              All Cities
            </MenuItem>
            {cities.map((ct) => (
              <MenuItem key={ct} value={ct}>
                {ct}
              </MenuItem>
            ))}
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
        {notFoundMassage ? <Typography>{notFoundMassage}</Typography> : null}
      </Paper>
    </Box>
  );
};
export default SearchSection;

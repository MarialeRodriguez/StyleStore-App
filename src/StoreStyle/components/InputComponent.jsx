import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory, setSelectedArticle } from '../../store/StoreStyle/storeSlice';
import { useNavigate } from 'react-router-dom';
import { setSelectedCheckoutArticle } from '../../store/checkout/checkoutSlice';

export const InputComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles } = useSelector( state => state.store );

  const options = articles.map((option) => {
    if(!!option ) return;
    const category = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(category) ? '0-9' : category,
      ...option,
    };
  });

  const handleAutoCompleteChange = (event, value) => {
    navigate('/article-detail');
    dispatch( setSelectedArticle(value) );
    dispatch( setSelectedCheckoutArticle(value));
  }

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.category.localeCompare(a.category))}
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.title}
      style={{ width: 500, marginLeft: 30 }}
      renderInput={(params) => <TextField {...params} placeholder='Search' variant="outlined"/>}
      onChange={(event, value) => handleAutoCompleteChange(event, value)}
  
    />
    
  );
}

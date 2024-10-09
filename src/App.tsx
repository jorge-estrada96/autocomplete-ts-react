import './App.css';
import { useState, useMemo, useCallback } from 'react';
import { useFetch } from './hooks/useFetch';
import { AutoComplete } from './components/Autocomplete';

interface Product {
  title: string;
  id: string;
}

interface Option {
  id: string;
  label: string;
}

const URL = 'https://dummyjson.com/products/search?q=';

function App() {
  const [terms, setTerms] = useState('');

  const url = useMemo(() => URL + terms, [terms]);

  const { data, loading, error } = useFetch(url);

  const products = data?.products;

  const options = useMemo(() => {
    return products?.map((product: Product) => ({
      id: product.id,
      label: product.title,
    }));
  }, [data]);

  if (error) console.log(error);

  const onOptionSelected = useCallback((option: Option) => {
    console.log('Option selected', option);
  }, []);

  return (
    <div className="container">
      <AutoComplete
        isLoading={loading}
        options={options}
        onSelectOption={onOptionSelected}
        onSearch={setTerms}
      />
      <AutoComplete
        isLoading={loading}
        options={options}
        onSelectOption={onOptionSelected}
        onSearch={setTerms}
      />
      <AutoComplete
        isLoading={loading}
        options={options}
        onSelectOption={onOptionSelected}
        onSearch={setTerms}
      />
      <AutoComplete
        isLoading={loading}
        options={options}
        onSelectOption={onOptionSelected}
        onSearch={setTerms}
      />
    </div>
  );
}

export default App;

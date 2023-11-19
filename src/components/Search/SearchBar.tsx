import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import SearchImg from '../../assets/search.svg';
import { useSearchParams } from 'react-router-dom';
import {
  DataSearchContext,
  DataSearchContextState,
} from '@/context/dataSearchContext/dataSearchContext';

interface MyProps {
  onSearch: (value: string) => void;
  setPage: (page: number) => void;
}

export const SearchBar: FC<MyProps> = ({ onSearch, setPage }) => {
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, setSearchValue } = useContext(
    DataSearchContext
  ) as DataSearchContextState;

  useEffect(() => {
    const storageValue = localStorage.getItem('searchValue');
    if (storageValue !== null) {
      setSearchValue(storageValue);
    }
  }, [setSearchValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  const handleSubmit = () => {
    setPage(1);
    searchParams.set('page', '1');
    searchParams.set('search', searchValue);
    setSearchParams(searchParams);
    onSearch(searchValue);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const onError = () => {
    throw new Error('new Error');
  };

  return (
    <div className="py-4 bg-gray-900">
      {error && onError()}

      <div className="search flex justify-center items-center">
        <input
          type="search"
          onChange={handleChange}
          onKeyDown={onKeyPressHandler}
          value={searchValue}
          className="h-full w-72 rounded-[7px] text-white  shadow-md shadow-teal-500 bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline-0 focus:shadow-yellow-400"
          placeholder="Search"
        />
        <button
          onClick={handleSubmit}
          className="h-10 rounded-md w-10 text-md shadow-teal-500 shadow-sm  ml-[1px] hover:shadow-yellow-400 bg-gray-800"
        >
          <img src={SearchImg} alt="Search" className="w-6 h-6 m-auto" />
        </button>
        <button
          onClick={() => setError(true)}
          className="h-10 rounded-md w-10 text-md shadow-teal-500 shadow-sm text-teal-500 ml-10 hover:shadow-yellow-400 bg-gray-800"
        >
          Error
        </button>
      </div>
    </div>
  );
};

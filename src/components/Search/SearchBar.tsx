import { ChangeEvent, FC, useEffect, useState } from 'react';
import SearchImg from '../../assets/search.svg';

interface MyProps {
  onSearch: (value: string) => void;
}

export const SearchBar: FC<MyProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue !== null) {
      setValue(searchValue);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    localStorage.setItem('searchValue', inputValue);
  };

  const handleSubmit = () => {
    onSearch(value);
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
          value={value}
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

import { FC, useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/Search/SearchBar';
import { getCharacterInfo } from '../../api/api';
import { Character, CharacterInfo } from '../../types/types';
import { Card } from '../../components/Card/Card';
import './mainPage.scss';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';

export const MainPage: FC = () => {
  const [character, setCharacter] = useState<Character[]>([]);
  const [result, setResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const searchProducts = useCallback(
    async (value: string) => {
      try {
        setContent(false, true);
        const characterInfo: CharacterInfo = await getCharacterInfo(
          value,
          page
        );
        setTimeout(() => {
          const character = characterInfo.results;
          setPages(characterInfo.info.pages);
          setCharacter(character);
          setContent(true, false);
        }, 3000);
      } catch {
        setContent(false, false);
      }
    },
    [page]
  );

  useEffect(() => {
    const searchValue: string = localStorage.getItem('searchValue') || '';

    searchProducts(searchValue);
  }, [searchProducts]);

  const setContent = (result: boolean, loader: boolean) => {
    setResult(result);
    setLoader(loader);
  };

  let content: JSX.Element | JSX.Element[];
  if (result) {
    content = character.map((character: Character) => (
      <Card character={character} key={character.id} />
    ));
  } else if (!result && !loader) {
    content = <div className="text-white mt-[300px]">Nothing Found.</div>;
  } else {
    content = <Loader />;
  }
  return (
    <div>
      <SearchBar onSearch={searchProducts} />
      <div className="cards__container p-5">{content}</div>
      {result && <Pagination page={page} setPage={setPage} pages={pages} />}
    </div>
  );
};

'use client';

// import ReactNode,
// useEffect
// 'react';
import { SearchBar } from '@/components/Search/SearchBar';
import { Character, CharacterInfo } from '@/types/types';
import { Card } from '@/components/Card/Card';
// import { Loader } from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { ReactNode } from 'react';
// import { Outlet } from 'react-router-dom';

type MainProps = {
  children?: ReactNode;
  cardsInfo: CharacterInfo;
};

export default function Layout({ cardsInfo, children }: MainProps) {
  // const page = useSelector(selectPage);
  // const searchValue = useSelector(selectSearchValue);
  // const dispatch = useDispatch();
  // const {
  //   data: charactersInfo,
  //   isSuccess,
  //   isError,
  // } = useGetCharactersInfoQuery({ searchValue, page });

  // useEffect(() => {
  //   dispatch(setAmountPage(charactersInfo?.info.pages));
  // });

  const content = cardsInfo.results.map((character: Character) => (
    <Card character={character} key={character.id} />
  ));
  // if (isSuccess) {
  //   content = charactersInfo.results.map((character: Character) => (
  //     <Card character={character} key={character.id} />
  //   ));
  // } else if (isError) {
  //   content = <div className="text-white mt-[300px]">Nothing Found.</div>;
  // } else {
  //   content = <Loader />;
  // }
  return (
    <div>
      <SearchBar />
      <div
        className="content flex justify-around w-full"
        data-testid="main-page-element"
      >
        <div className="content__list flex-grow">
          <div className="cards__container p-5">{content}</div>
          <Pagination amountPages={cardsInfo.info.pages} />
        </div>
        <div className="content__details mt-5 pr-5">{children}</div>
      </div>
    </div>
  );
}

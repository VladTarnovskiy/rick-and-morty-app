'use client';

import // ReactNode,
// useEffect
'react';
import { SearchBar } from '@/components/Search/SearchBar';
import { Character, CharacterInfo } from '@/types/types';
import { Card } from '@/components/Card/Card';
// import { Loader } from '@/components/Loader/Loader';
// import { Pagination } from '@/components/Pagination/Pagination';
// import { Outlet } from 'react-router-dom';
import {
  getCharactersInfo,
  getRunningQueriesThunk,
  // useGetCharactersInfoQuery,
} from '@/store/slices/ApiSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   selectPage,
//   selectSearchValue,
//   setAmountPage,
// } from '@/store/slices/MainPageSlice';
import { wrapper } from '@/store/store';
import { checkRouterQuery } from '@/utils/routerQuery';

type MainProps = {
  // children?: ReactNode;
  pageProps: { cardsInfo: { data: CharacterInfo } };
};

export default function MainPage({ pageProps }: MainProps) {
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

  const content = pageProps.cardsInfo.data.results.map(
    (character: Character) => <Card character={character} key={character.id} />
  );
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
          {/* {isSuccess && <Pagination />} */}
        </div>
        <div className="content__details mt-5 pr-5">{/* <Outlet /> */}</div>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, search } = context.query;
    const data = await store.dispatch(
      getCharactersInfo.initiate({
        page: Number(checkRouterQuery(page)) || 1,
        searchValue: checkRouterQuery(search) || '',
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        cardsInfo: data,
      },
    };
  }
);

import { SearchBar } from '../components/Search/SearchBar';
import { Character, CharacterInfo } from '../types/types';
import { Card } from '../components/Card/Card';
import { Pagination } from '../components/Pagination/Pagination';
import { ReactNode } from 'react';

type MainProps = {
  children?: ReactNode;
  cardsInfo: CharacterInfo;
};

export default function Layout({ cardsInfo, children }: MainProps) {
  const content = cardsInfo.results.map((character: Character) => (
    <Card character={character} key={character.id} />
  ));
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

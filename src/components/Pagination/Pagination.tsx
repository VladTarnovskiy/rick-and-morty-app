import { FC } from 'react';
import { Button } from '../../components/Button/Button';
import ArrowImgLeft from '../../assets/arrow-sm-left.svg';
import ArrowImgRight from '../../assets/arrow-sm-right.svg';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

interface MyProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<MyProps> = ({ page, pages, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPageParams = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-center text-2xl mb-5 text-teal-500">
      <Button
        onClick={() => {
          const locPage = page > 1 ? page - 1 : page;
          setPage(locPage);
          setPageParams(locPage);
        }}
      >
        <img
          src={ArrowImgLeft}
          alt="Turn left"
          className={clsx('w-7 h-7 mt-[-2px]', {
            'opacity-20': page === 1 ? true : false,
          })}
        />
      </Button>
      <div className="mx-2 pt-[2px]">{page}</div>
      <Button
        onClick={() => {
          setPage(page + 1);
          setPageParams(page + 1);
        }}
      >
        <img
          src={ArrowImgRight}
          alt="Turn right"
          className={clsx('w-7 h-7 mt-[-2px]', {
            'opacity-20': page === pages ? true : false,
          })}
        />
      </Button>
    </div>
  );
};

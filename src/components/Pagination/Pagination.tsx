import { FC, useState } from 'react';
import { Button } from '../../components/Button/Button';
import ArrowImgLeft from '../../assets/arrow-sm-left.svg';
import ArrowImgRight from '../../assets/arrow-sm-right.svg';
import clsx from 'clsx';
// import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePage,
  selectAmountPages,
  selectPage,
} from '@/store/slices/MainPageSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

interface IProps {
  amountPages: number;
}

export const Pagination = ({ amountPages }: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch();
  // const page = useSelector(selectPage);
  // const amountPages = useSelector(selectAmountPages);
  const [page, setPage] = useState(1);

  const setPageParams = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(pathname + '?' + params.toString());
    // searchParams.set('page', String(page));
    // setSearchParams(searchParams);
    setPage(page);
  };

  return (
    <div className="flex justify-center text-2xl mb-5 text-teal-500">
      <Button
        onClick={() => {
          const page = Number(searchParams.get('page'));
          const locPage = page > 1 ? page - 1 : page;
          dispatch(changePage(locPage));
          setPageParams(locPage);
        }}
      >
        <Image
          src={ArrowImgLeft}
          width={28}
          height={28}
          alt="Turn left"
          className={clsx('w-7 h-7 mt-[-2px]', {
            'opacity-20': page === 1 ? true : false,
          })}
        />
      </Button>
      <div className="mx-2 pt-[2px]" data-testid="page-counter">
        {page}
      </div>
      <Button
        onClick={() => {
          const locPage = page < amountPages! ? page + 1 : page;
          dispatch(changePage(locPage));
          setPageParams(locPage);
        }}
      >
        <Image
          src={ArrowImgRight}
          width={28}
          height={28}
          alt="Turn right"
          className={clsx('w-7 h-7 mt-[-2px]', {
            'opacity-20': page === amountPages ? true : false,
          })}
        />
      </Button>
    </div>
  );
};

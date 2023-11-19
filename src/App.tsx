import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { DataSearchProvider } from './context/dataSearchContext/dataSearchContext';

export const App: FC = () => {
  return (
    <>
      <DataSearchProvider>
        <Outlet />
      </DataSearchProvider>
    </>
  );
};

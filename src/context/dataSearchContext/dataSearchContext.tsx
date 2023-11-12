import { Character } from '@/types/types';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export interface DataSearchContextState {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  character: Character[];
  setCharacter: Dispatch<SetStateAction<Character[]>>;
}

interface DataSearchContextProps {
  children: ReactNode;
}

export const DataSearchContext = createContext<
  DataSearchContextState | undefined
>(undefined);

export const DataSearchProvider: FC<DataSearchContextProps> = ({
  children,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );
  const [character, setCharacter] = useState<Character[]>([]);

  const contextValue: DataSearchContextState = {
    searchValue,
    setSearchValue,
    character,
    setCharacter,
  };

  return (
    <DataSearchContext.Provider value={contextValue}>
      {children}
    </DataSearchContext.Provider>
  );
};

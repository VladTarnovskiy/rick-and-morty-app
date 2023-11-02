import { getCharacterInfo } from '../api/api';
import { LoaderFunction } from 'react-router-dom';

interface LoaderParams {
  detailsId: string;
}
export const detailsLoader: LoaderFunction<LoaderParams> = async ({
  params,
}) => {
  const characterData = await getCharacterInfo(Number(params.detailsId));
  return characterData;
};

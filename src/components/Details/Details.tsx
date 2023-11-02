import { FC } from 'react';
// import { Loader } from '../Loader/Loader';
import { defer, useLoaderData } from 'react-router-dom';
import { Character } from 'types/types';
import { getCharacterInfo } from '../../api/api';
import { LoaderFunction } from 'react-router-dom';

interface LoaderParams {
  detailsId: string;
}

export const Details: FC = () => {
  const character = useLoaderData() as Character;
  const status = character.status;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_searchParams, setSearchParams] = useSearchParams();
  // setSearchParams((prevParams) => {
  //   return { ...prevParams, details: character.id };
  // });

  // useEffect(() => {
  //   setSearchParams((prevParams) => {
  //     return { ...prevParams, details: character.id };
  //   });
  // }, [character.id, setSearchParams]);

  // const [character, setCharacter] = useState<Character>();
  // const { detailsId } = useParams();

  // const searchProducts = useCallback(async () => {
  //   try {
  //     const character: Character = await getCharacterInfo(Number(detailsId));
  //     setCharacter(character);
  //   } catch {
  //     console.log('Character Error.');
  //   }
  // }, [detailsId]);

  // useEffect(() => {
  //   searchProducts();
  // }, [searchProducts]);
  const getStatusColor = (value: string) => {
    let color = 'text-sky-500';

    if (value === 'Alive') {
      color = 'text-green-500';
    } else if (value === 'Dead') {
      color = 'text-red-500';
    } else {
      color = 'text-blue-500';
    }

    return color;
  };
  const color = getStatusColor(status);

  return (
    <>
      {/* {character ? ( */}
      <div
        className="card flex flex-col text-white text-lg justify-start items-center rounded-xl w-[350px] bg-zinc-700 shadow-lg"
        key={character.id}
      >
        <img
          src={character.image}
          alt="episode__img"
          className="rounded-lg w-full"
        />

        <div className="card_description flex-col self-start p-4">
          <div className="card__title text-2xl font-bold">{character.name}</div>
          <div className="card__status mb-1">
            <span className={color}>● </span>
            {character.species} - {character.status}
          </div>
          <div className="card__location flex flex-col mb-1">
            <div className="location__title text-md text-zinc-400">
              Last known location:
            </div>
            <div className="location__content">{character.location.name}</div>
          </div>
          <div>
            <div className="text-zinc-400">Episodes:</div>
            {character.episode.map((ep, index) => {
              const episodeNum = ep.split('/').at(-1);
              if (index === character.episode.length - 1) {
                return <span key={episodeNum}>{episodeNum}</span>;
              }
              return <span key={episodeNum}>{episodeNum}, </span>;
            })}
          </div>
        </div>
      </div>
      {/* ) : (
        <Loader />
      )} */}
    </>
  );
};

export const detailsLoader: LoaderFunction<LoaderParams> = async ({
  params,
}) => {
  const characterData = await getCharacterInfo(Number(params.detailsId));
  return defer({
    characterData,
  });
};

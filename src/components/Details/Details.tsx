import { FC, Suspense } from 'react';
import { Loader } from '../Loader/Loader';
import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Character } from '../../types/types';
import { getCharacterInfo } from '../../api/api';
import { Button } from '../../components/Button/Button';

interface LoaderParams {
  detailsId: string;
}

interface CharacterLoader {
  character: Character;
}

const Details: FC = () => {
  const { character } = useLoaderData() as CharacterLoader;
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const status = character.status;
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

  const onClose = () => {
    navigate('/', { replace: false, state: { from: 'current-path' } });
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div className="title text-teal-500 text-center text-2xl font-thin mb-2">
        Details
      </div>
      <Suspense
        fallback={
          <div className="w-[350px] flex justify-center">
            <Loader />
          </div>
        }
      >
        <Await resolve={character}>
          {(resolvedCharacter: Character) => (
            <div
              className="card flex flex-col text-white text-lg justify-start items-center rounded-xl w-[350px] bg-zinc-700 shadow-lg"
              key={resolvedCharacter.id}
              data-testid="cardDetail-element"
            >
              <img
                src={resolvedCharacter.image}
                alt="episode__img"
                className="rounded-lg w-[350px] h-[350px]"
              />

              <div className="card_description flex-col self-start p-4 pb-2">
                <div className="card__title text-2xl font-bold">
                  {resolvedCharacter.name}
                </div>
                <div className="card__status mb-1">
                  <span className={color}>● </span>
                  {resolvedCharacter.species} - {resolvedCharacter.status}
                </div>
                <div className="card__location flex flex-col mb-1">
                  <div className="location__title text-md text-zinc-400">
                    Last known location:
                  </div>
                  <div className="location__content">
                    {resolvedCharacter.location.name}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400">Episodes:</div>
                  {resolvedCharacter.episode.map((ep, index) => {
                    const episodeNum = ep.split('/').at(-1);
                    if (index === resolvedCharacter.episode.length - 1) {
                      return <span key={episodeNum}>{episodeNum}</span>;
                    }
                    return <span key={episodeNum}>{episodeNum}, </span>;
                  })}
                </div>
              </div>
              <div className="m-auto mb-2">
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

const detailsLoader: LoaderFunction<LoaderParams> = async ({ params }) => {
  const id = params.detailsId;

  return defer({ character: getCharacterInfo(Number(id)) });
};

export { detailsLoader, Details };

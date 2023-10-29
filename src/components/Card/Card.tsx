import { Component } from 'react';
import { Charter } from 'types/types';

interface MyProps {
  charter: Charter;
}

export class Card extends Component<MyProps> {
  getStatusColor(value: string) {
    let color = 'text-sky-500';

    if (value === 'Alive') {
      color = 'text-green-500';
    } else if (value === 'Dead') {
      color = 'text-red-500';
    } else {
      color = 'text-blue-500';
    }

    return color;
  }
  render() {
    const { name, location, image, species, status } = this.props.charter;
    const color = this.getStatusColor(status);
    return (
      <div className="card flex text-white text-lg justify-start items-center rounded-xl w-[450px] h-[180px] bg-zinc-700 shadow-lg">
        <img
          src={image}
          alt="episode__img"
          className="h-full rounded-lg mr-3"
        />

        <div className="card_description flex-col">
          <div className="card__title text-2xl font-bold ">{name}</div>
          <div className="card__status mb-1">
            <span className={color}>● </span>
            {species} - {status}
          </div>
          <div className="card__location flex flex-col mb-1">
            <div className="location__title text-md text-zinc-400">
              Last known location:
            </div>
            <div className="location__content">{location.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

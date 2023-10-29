import { Component } from 'react';
import './loader.scss';

export class Loader extends Component {
  render() {
    return (
      <div className="lds-ring mt-[300px]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

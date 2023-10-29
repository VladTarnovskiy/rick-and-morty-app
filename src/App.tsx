import { Component } from 'react';
import MainPage from './pages/Main/MainPage';

export class App extends Component {
  render() {
    return (
      <div className="bg-gray-600 w-full h-full">
        <MainPage />
      </div>
    );
  }
}

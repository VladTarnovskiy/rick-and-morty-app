import { Component } from 'react';
import { MainPage } from './pages/Main/MainPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </div>
    );
  }
}

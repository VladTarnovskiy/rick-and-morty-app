import { Component } from 'react';
import { SearchBar } from '../../components/Search/SearchBar';
import { getChartersInfo } from '../../services/service';
import { Charter, ChartersInfo } from '../../types/types';
import { Card } from '../../components/Card/Card';
import './mainPage.scss';
import { Loader } from '../../components/Loader/Loader';

interface MyProps {}

interface MyState {
  charters: Charter[];
  result: boolean;
  loader: boolean;
}

export class MainPage extends Component<MyProps, MyState> {
  state = {
    charters: [],
    result: false,
    loader: false,
  };
  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    let value = '';
    if (searchValue !== null) {
      value = searchValue;
    }
    this.searchProducts(value);
  }
  searchProducts = async (value: string) => {
    try {
      this.setState((prevState) => {
        return {
          charters: prevState.charters,
          result: false,
          loader: true,
        };
      });
      const chartersInfo: ChartersInfo = await getChartersInfo(value);
      setTimeout(() => {
        const charters = chartersInfo.results;
        this.setState({ charters: charters, result: true, loader: false });
      }, 3000);
    } catch {
      this.setState((prevState) => {
        return { charters: prevState.charters, result: false, loader: false };
      });
    }
  };

  render() {
    let content: JSX.Element | JSX.Element[];
    if (this.state.result) {
      content = this.state.charters.map((charter: Charter) => (
        <Card charter={charter} key={charter.id} />
      ));
    } else if (!this.state.result && !this.state.loader) {
      content = <div className="text-white">Nothing Found.</div>;
    } else {
      content = <Loader />;
    }
    return (
      <div>
        <SearchBar onSearch={this.searchProducts} />
        <div className="cards__container p-5">{content}</div>
      </div>
    );
  }
}

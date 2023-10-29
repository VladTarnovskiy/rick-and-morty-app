import { Component } from 'react';
import { SearchBar } from '../../components/Search/SearchBar';
import { getChartersInfo } from '../../services/service';
import { Charter, ChartersInfo } from '../../types/types';
import { Card } from '../../components/Card/Card';
import './mainPage.scss';

interface MyProps {}

interface MyState {
  charters: Charter[];
  result: boolean;
}

class Home extends Component<MyProps, MyState> {
  state = {
    charters: [],
    result: false,
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
      const chartersInfo: ChartersInfo = await getChartersInfo(value);
      const charters = chartersInfo.results;
      this.setState({ charters: charters, result: true });

      console.log(charters);
    } catch {
      this.setState((prevState) => {
        return { charters: prevState.charters, result: false };
      });
    }
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.searchProducts} />
        <div className="cards__container p-5">
          {this.state.result ? (
            this.state.charters.map((charter: Charter) => (
              <Card charter={charter} key={charter.id} />
            ))
          ) : (
            <div className="text-white">Nothing Found.</div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;

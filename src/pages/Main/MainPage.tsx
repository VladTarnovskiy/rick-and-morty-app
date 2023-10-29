import { Component } from 'react';
import { SearchBar } from '../../components/Search/SearchBar';
import { getChartersInfo } from '../../services/service';
import { Charter, ChartersInfo } from '@/types/types';

interface MyProps {}

interface MyState {
  charters: Charter[];
}

class Home extends Component<MyProps, MyState> {
  state = {
    charters: [],
  };
  componentDidMount() {}
  searchProducts = async (value: string) => {
    const chartersInfo: ChartersInfo = await getChartersInfo(value);
    const charters = chartersInfo.results;
    this.setState({ charters: charters });
    console.log(charters);
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.searchProducts} />
        <div className="content"></div>
      </div>
    );
  }
}

export default Home;

import { Component } from 'react';
import { SearchBar } from '../../components/Search/SearchBar';
import { getCharacterInfo } from '../../api/api';
import { Character, CharacterInfo } from '../../types/types';
import { Card } from '../../components/Card/Card';
import './mainPage.scss';
import { Loader } from '../../components/Loader/Loader';

interface MyProps {}

interface MyState {
  character: Character[];
  result: boolean;
  loader: boolean;
}

export class MainPage extends Component<MyProps, MyState> {
  state = {
    character: [],
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
      this.setState({
        result: false,
        loader: true,
      });
      const characterInfo: CharacterInfo = await getCharacterInfo(value);
      setTimeout(() => {
        const character = characterInfo.results;
        this.setState({ character: character, result: true, loader: false });
      }, 3000);
    } catch {
      this.setState({ result: false, loader: false });
    }
  };

  render() {
    let content: JSX.Element | JSX.Element[];
    if (this.state.result) {
      content = this.state.character.map((character: Character) => (
        <Card character={character} key={character.id} />
      ));
    } else if (!this.state.result && !this.state.loader) {
      content = <div className="text-white mt-[300px]">Nothing Found.</div>;
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

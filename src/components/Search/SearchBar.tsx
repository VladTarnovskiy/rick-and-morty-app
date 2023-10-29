import { ChangeEvent, Component } from 'react';
import SearchImg from '../../assets/search.svg';

interface MyState {
  value: string;
}

interface MyProps {
  onSearch: (value: string) => void;
}

export class SearchBar extends Component<MyProps, MyState> {
  state = { value: '' };

  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue !== null) {
      this.setState({ value: searchValue });
    }
  }

  componentDidUpdate() {
    const { value } = this.state;
    localStorage.setItem('searchValue', value);
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    const { value } = this.state;
    const { onSearch } = this.props;
    onSearch(value);
  };

  onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div className="py-4 bg-gray-900">
        <div className="search flex justify-center items-center">
          <input
            type="search"
            onChange={this.handleChange}
            onKeyDown={this.onKeyPressHandler}
            value={value}
            className="h-full w-72 rounded-[7px] text-white  shadow-md shadow-yellow-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline-0 focus:shadow-teal-500"
            placeholder="Search"
          />
          <button
            onClick={this.handleSubmit}
            className="h-10 rounded-md w-10 text-md shadow-yellow-400  ml-[1px] hover:shadow-md hover:shadow-teal-500 bg-yellow-400"
          >
            <img src={SearchImg} alt="Search" className="w-6 h-6 m-auto" />
          </button>
        </div>
      </div>
    );
  }
}

import { Component } from 'react';

interface MyProps {
  onClick: () => void;
  children: React.ReactNode;
}

export class Button extends Component<MyProps> {
  render() {
    const { onClick, children } = this.props;

    return (
      <button
        onClick={onClick}
        className="h-10 rounded-md p-2 text-md shadow-teal-500 shadow-sm hover:shadow-yellow-400 bg-gray-800"
      >
        {children}
      </button>
    );
  }
}

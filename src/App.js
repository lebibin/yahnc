import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title:         'React',
    url:          'https://facebook.github.io/react',
    author:       'Jordan Walke',
    num_comments: 3,
    points:       4,
    objectID:     0
  },
  {
    title:         'Vue',
    url:          'https://vue.js',
    author:       'Vue JS',
    num_comments: 5,
    points:       1,
    objectID:     1
  }
]

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm
      || item.title.toLowerCase().includes(searchTerm.toLowerCase())
      || item.author.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const message = "Road to learn React"
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <h2>{message}</h2>
        </div>
        <div className="page">
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
            >
              <p>Search:</p>
            </Search>
          </div>
          <hr />
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <div>
      {children}
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
}

const Table = ({list, pattern, onDismiss}) => {
  return (
    <div className="table">
      <div className="table-row table-header">
        <span>Title</span>
        <span>Author</span>
        <span>Comments</span>
        <span>Points</span>
        <span></span>
      </div>
      { list.filter(isSearched(pattern)).map( item => {
        return (
          <ItemRow item={item} onDismiss={onDismiss} />
        )
      })}
    </div>
  );
}

const ItemRow = ({item, onDismiss}) => {
  return (
    <div className='table-row' key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <Button className='button-inline' onClick={() => onDismiss(item.objectID)}>
          Dismiss
        </Button>
      </span>
    </div>
  );
}

const Button = ({ onClick, className, children}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export default App;

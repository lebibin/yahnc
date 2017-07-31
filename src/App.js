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
    const message = "Sup, b?"
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <h2>{message}</h2>
        </div>
        <div className="App-intro">
          <p>Search:</p>
          <form>
            <input
              type="text"
              value={searchTerm}
              onChange={this.onSearchChange}
            />
          </form>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Comments</th>
                <th>Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { list.filter(isSearched(searchTerm)).map( item => {
                return (
                  <tr key={item.objectID}>
                    <td>
                      <a href={item.url}>{item.title}</a>
                    </td>
                    <td>{item.author}</td>
                    <td>{item.num_comments}</td>
                    <td>{item.points}</td>
                    <td>
                      <button
                        onClick={ () => this.onDismiss(item.objectID)}
                        type="button"
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

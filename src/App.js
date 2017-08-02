import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'KSHHJ';
const API_ROOT      = 'https://api.opendota.com/api';
const ENDPOINT      = '/search'
const PARAM         = '?q='

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchPlayers = this.setSearchPlayers.bind(this);
    this.fetchSearchPlayers = this.fetchSearchPlayers.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchPlayers(result) {
    this.setState({result});
  }

  fetchSearchPlayers(searchTerm) {
    let request = `${API_ROOT}${ENDPOINT}${PARAM}${searchTerm}`;
    fetch(request)
      .then(response => response.json())
      .then(result => this.setSearchPlayers(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchPlayers(searchTerm);
  }

  onDismiss(id) {
    const isNotId = item => item.account_id !== id;
    const updatedList = this.state.result.filter(isNotId);
    this.setState({ result: updatedList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchPlayers(searchTerm);
    event.preventDefault();
  }

  render() {
    const message = "OpenDota Player Search"
    const { searchTerm, result } = this.state;
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
              onSubmit={this.onSearchSubmit}
            >
              Search
            </Search>
          </div>
          <hr />
          {
            result
              ?
              <Table
                result={result}
                onDismiss={this.onDismiss}
              />
              : null
          }
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <Button className='button' onClick={onSubmit} children={children} />
    </form>
  </div>
  );
}

const Table = ({result, onDismiss}) => {
  return (
    <div className="table">
      <div className="table-row table-header">
        <span>Avatar</span>
        <span>Name</span>
        <span>Last Match</span>
        <span>Probability</span>
        <span></span>
      </div>
      { result.map( player => {
        return (
          <div key={player.account_id}>
            <PlayerRow player={player} onDismiss={onDismiss} />
          </div>
        )
      })}
    </div>
  );
}

const PlayerRow = ({player, onDismiss}) => {
  return (
    <div className='table-row'>
      <span>
        <a target="_blank" href={`https://www.opendota.com/players/${player.account_id}`}>
          <img src={player.avatarfull} alt={player.personaname} width="30" height="30" />
        </a>
      </span>
      <span>{player.personaname}</span>
      <span>{player.last_match_time}</span>
      <span>{player.similarity}</span>
      <span>
        <Button className='button-inline' onClick={() => onDismiss(player.account_id)}>
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

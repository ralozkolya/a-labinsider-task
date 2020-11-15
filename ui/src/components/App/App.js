import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, CircularProgress } from '@material-ui/core';
import FavoritesTable from '../FavoritesTable';
import AllFacilitiesTable from '../AllFacilitiesTable';
import StatusText from '../StatusText';
import env from '../../environments/env';
import './App.scss';

const { URL } = env;

export default class App extends Component {

  state = {
    data: [],
    loading: false,
    error: null,
    page: 1
  };

  componentDidMount() {
    this.retrieve();
  }

  retrieve = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`${URL}/facilities`);
      if (response.ok) {
        const data = await response.json();
        this.setState({ data });
      } else {
        throw Error(response.statusText);
      }
    } catch (e) {
      this.setState({ error: e.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
        <Container className="container">
          {this.state.error || this.state.loading ? (
            <StatusText>{this.state.error || <CircularProgress />}</StatusText>
          ) : (
            <Switch>
              <Route path="/favorites">
                <FavoritesTable
                  data={ this.state.data }
                  onRefresh={ this.retrieve }
                />
              </Route>
              <Route path="/">
                <AllFacilitiesTable
                  data={ this.state.data }
                  onRefresh={ this.retrieve } />
              </Route>
            </Switch>
          )}
        </Container>
      </Router>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import TableComponent from './TableComponent';
import Heading from './Heading';

const IDS_KEY = 'ids';
const PER_PAGE = 10;

export default class TableWrapper extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onlyFavorites: PropTypes.bool,
    onRefresh: PropTypes.func
  };

  state = {
    ids: [],
    page: 0,
    data: [],
    filtered: []
  };

  componentDidMount() {
    const ids = JSON.parse(localStorage.getItem(IDS_KEY) || '[]');
    this.updateIds(ids);
  }

  toggleFavorite = id => {
    const ids = this.state.ids;
    ids.includes(id) ? ids.splice(ids.indexOf(id), 1) : ids.push(id);
    localStorage.setItem(IDS_KEY, JSON.stringify(ids));
    this.updateIds(ids);
  };

  clearFavorites = () => {
    localStorage.removeItem(IDS_KEY);
    this.updateIds([]);
  };

  updatePage = page => {

    const data = this.state.filtered;

    page = Math.max(0, Math.min(page, Math.ceil(data.length / PER_PAGE)));

    this.setState({
      page,
      data: data.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
    });

  };

  disablePrevious = () => {
    return this.state.page < 1;
  };

  disableNext = () => {
    return this.state.page * PER_PAGE + PER_PAGE >= this.state.filtered.length;
  };
  
  updateIds = ids => {
    const filtered = this.props.onlyFavorites ?
      this.props.data.filter(row => ids.includes(row._id)) :
      this.props.data;
    this.setState({ ids, filtered }, () => this.updatePage(this.state.page));
  };

  render() {

    const data = this.state.data;
    const page = this.state.page;

    return (
      <>
        <Heading onRefresh={ this.props.onRefresh }>
          { this.props.onlyFavorites ? 'Favorite research facilities' : 'All research facilities' }
        </Heading>

        {
          this.props.onlyFavorites ?
          <Button variant="outlined" color="primary" onClick={ this.clearFavorites }>
            Clear all
          </Button> : null
        }

        <TableComponent
          data={ data }
          ids={ this.state.ids }
          onToggleFavorite={ this.toggleFavorite } />

        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          Showing { this.state.page * PER_PAGE + 1 }-{ this.state.page * PER_PAGE + PER_PAGE } out of { this.state.filtered.length }
          <ButtonGroup style={{ marginLeft: '1rem' }} color="default">
            <Button
              disabled={ this.disablePrevious() }
              onClick={ () => this.updatePage(page - 1) } >
              <FontAwesomeIcon icon={ faAngleLeft } />
            </Button>
            <Button
              disabled={ this.disableNext() }
              onClick={ () => this.updatePage(page + 1) } >
              <FontAwesomeIcon icon={ faAngleRight } />
            </Button>
          </ButtonGroup>
        </div>
      </>
    );
  }

}

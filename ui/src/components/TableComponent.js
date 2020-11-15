import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from '@material-ui/core';
import StatusText from './StatusText';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default class TableComponent extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    ids: PropTypes.array,
    onToggleFavorite: PropTypes.func.isRequired
  };

  static defaultProps = {
    ids: []
  };

  isFavorite = id => {
    return this.props.ids.includes(id);
  };

  render() {

    return (
      <TableContainer style={{ margin: '2rem 0' }} component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.data.length ?
              this.props.data.map(row => {
                const favorite = this.isFavorite(row._id);
                return (
                  <TableRow key={ row._id }>
                    <TableCell>{ row.name }</TableCell>
                    <TableCell>{ row.city }</TableCell>
                    <TableCell>{ row.country }</TableCell>
                    <TableCell>{ row.director }</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={ () => this.props.onToggleFavorite(row._id) }
                        color={ favorite ? 'default' : 'primary' }
                        variant="contained">
                        <FontAwesomeIcon icon={ favorite ? faHeartBroken : faHeart } />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) :
              <TableRow>
                <TableCell colSpan={ 5 }>
                  <StatusText>No facilities</StatusText>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

}

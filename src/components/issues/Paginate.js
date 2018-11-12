import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Paginate extends Component {
  render() {
    return <PaginateContainer />;
  }
}

const PaginateContainer = styled.div``;

const ButtonsContainer = styled.div``;

export default connect(null)(Paginate);

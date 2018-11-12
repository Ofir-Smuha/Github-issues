// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

type ConnectedProps = {
  currentPage: number,
  pageCount: number
};

type OwnProps = {};

class Paginate extends Component<ConnectedProps & OwnProps> {
  render() {
    if (this.props.pageCount === 0) {
      return null;
    }

    return (
      <PaginateContainer>
        <ButtonsContainer>
          <PageButton>{this.props.pageCount}</PageButton>
          <PageButton>1</PageButton>
          <PageButton>1</PageButton>
          <PageButton>1</PageButton>
          <PageButton>1</PageButton>
          <PageButton>1</PageButton>
        </ButtonsContainer>
      </PaginateContainer>
    );
  }
}

const PaginateContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  display: flex;
`;

const PageButton = styled.div`
  color: #0366d6;
  cursor: pointer;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #fff;
    background-color: #0366d6;
  }

  &:not(:last-child) {
    border-right: 1px solid #e1e4e8;
  }
`;

const mapStateToProps = state => ({
  currentPage: state.issues.currentPage,
  pageCount: state.issues.pageCount
});

export default connect(mapStateToProps)(Paginate);

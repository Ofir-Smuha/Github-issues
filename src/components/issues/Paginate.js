// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import { fetchIssues } from 'actions/issues.actions';

type ConnectedProps = {
  currentPage: number,
  pageCount: number,
  fetchIssues: () => void
};

type OwnProps = {};

class Paginate extends Component<ConnectedProps & OwnProps> {
  handlePageChange = page => {
    const selectedPage = page.selected + 1;
    this.props.fetchIssues(selectedPage);
  };

  render() {
    if (this.props.pageCount === 0) {
      return null;
    }

    return (
      <PaginateContainer>
        <ButtonsContainer>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break"
            pageCount={this.props.pageCount}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            activeClassName="active"
            pageClassName="pageButton"
            containerClassName="buttonsContainer"
            previousClassName="previous"
            nextClassName="next"
          />
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
  font-size: 14px;
  font-weight: 600;

  .buttonsContainer {
    border: 1px solid #e1e4e8;
    border-radius: 3px;
    display: flex;
  }

  .pageButton {
    color: #0366d6;
    cursor: pointer;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #e1e4e8;
    border-left: 1px solid #e1e4e8;

    &:hover {
      color: #fff;
      background-color: #0366d6;
    }
  }

  .previous,
  .next {
    color: #0366d6;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;

    &:hover {
      color: #fff;
      background-color: #0366d6;
    }
  }

  .break {
    color: ${({ theme }) => theme.detailsGrey};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    cursor: pointer;
  }
`;

const ButtonsContainer = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  display: flex;
`;

const mapStateToProps = state => ({
  currentPage: state.issues.currentPage,
  pageCount: state.issues.pageCount
});

export default connect(mapStateToProps, { fetchIssues })(Paginate);

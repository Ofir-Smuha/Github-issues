import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get, debounce } from 'lodash/fp';

import { setIssuesParameters } from 'actions/issues.actions';

import searchIcon from 'assets/images/search.svg';

class FilterAddBar extends Component {
  state = {
    searchValue: ''
  };

  handleRedirect = () => {
    const path = `${get('pathname', this.props.location)}/new-issue`;
    this.props.history.push(path);
  };

  handleSearchByText = e => {
    this.setState({ searchValue: e.target.value });
    console.log(this.props.parameters);
    this.props.setIssuesParameters(
      `${this.props.parameters}&${this.state.searchValue}`
    );
  };

  render() {
    return (
      <FilterAddContainer>
        <TextSearch>
          <SearchByButton>Filters</SearchByButton>
          <TextInput
            type="text"
            value={this.state.searchValue}
            onChange={this.handleSearchByText}
            placeholder="Search.."
          />
        </TextSearch>
        <NewIssueBtn onClick={this.handleRedirect}>New issue</NewIssueBtn>
      </FilterAddContainer>
    );
  }
}

const FilterAddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TextSearch = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  height: 30px;
`;

const SearchByButton = styled.button`
  font-size: 15px;
  color: #444d56;
  font-weight: 600;
  padding: 4px 8px 6px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  border: 1px solid #d1d5da;
  height: 100%;
  border-right: hidden;
  outline: none;
`;

const TextInput = styled.input`
  background: url(${searchIcon}) no-repeat center;
  background-position: 5px 55%;
  background-size: 15px;
  font-size: 15px;
  padding: 6px 8px 8px 30px;
  width: 320px;
  color: #586069;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  border: 1px solid #d1d5da;
  height: 100%;
  outline: none;
`;

const NewIssueBtn = styled.div`
  padding: 6px 12px;
  font-weight: 600;
  color: #fff;
  background-image: ${({ theme }) => theme.greenGradient};
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  cursor: pointer;
`;

const mapStateToProps = state => ({
  parameters: state.issues.issuesParameters
});

export default withRouter(
  connect(mapStateToProps, { setIssuesParameters })(FilterAddBar)
);

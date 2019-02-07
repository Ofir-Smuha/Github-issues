import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { isEmpty } from 'lodash/fp';

import { fetchSearchedRepos } from 'actions/issues.actions';

import bookIcon from 'assets/images/book.svg';

class AutoSearch extends Component {
  state = {
    isOpen: false,
    searchValue: ''
  };

  handleSearch = e => {
    const value = e.target.value;
    this.setState({ searchValue: value });
    this.props.fetchSearchedRepos(value);
  };

  handleSelect = path => {
    this.props.history.push(`/${path}/issues`);
    this.setState({
      isOpen: false,
      searchValue: ''
    });
  };

  renderSearchedRepos = () => {
    const repositories = this.props.repositories.slice(0, 7);

    return repositories.map(repo => (
      <ListItem onClick={() => this.handleSelect(repo.full_name)}>
        <ItemIcon />
        <ItemTitle>{repo.full_name}</ItemTitle>
      </ListItem>
    ));
  };

  render() {
    return (
      <AutoSearchWrapper>
        <OutsideClickHandler
          onOutsideClick={() => this.setState({ isOpen: false })}>
          <Input
            type="text"
            value={this.state.searchValue}
            isOpen={this.state.isOpen}
            onClick={() => this.setState({ isOpen: true })}
            onChange={this.handleSearch}
            placeholder="Search or jump to..."
          />

          {this.props.repositories &&
            !isEmpty(this.state.searchValue) && (
              <DropDown isOpen={this.state.isOpen}>
                {this.renderSearchedRepos()}
              </DropDown>
            )}
        </OutsideClickHandler>
      </AutoSearchWrapper>
    );
  }
}

const AutoSearchWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  height: 30px;
  width: 300px;
  font-size: 14px;
  border-radius: 3px;
  color: ${props => (props.isOpen ? 'black' : '#fff')};
  background-color: ${props => (props.isOpen ? '#fff' : '#3f4447')};
  border: none;
  outline: none;
  padding: 0 0 0 20px;

  &::placeholder {
    color: #8d9091;
  }

  ${props =>
    props.isOpen &&
    `
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `};
`;

const DropDown = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e1e4e8;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  color: black;
  height: 45px;
  cursor: pointer;

  &:hover {
    background-color: #0366d6;
    color: #fff;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e1e4e8;
  }
`;

const ItemIcon = styled.div`
  background: url(${bookIcon}) no-repeat center;
  width: 20px;
  height: 20px;
  margin: 0 10px;
`;

const ItemTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
`;

const mapStateToProps = state => ({
  repositories: state.issues.searchedRepos
});

export default withRouter(
  connect(mapStateToProps, { fetchSearchedRepos })(AutoSearch)
);

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { isEmpty, mapKeys, map, get, includes } from 'lodash/fp';
import qs from 'qs';

import SortDropDown from 'components/issues/filter-sort-panel/SortDropDown';
import IssuesState from 'components/issues/filter-sort-panel/IssuesState';
import ListSelect from 'components/common/ListSelect';
import ListItem from 'components/common/ListItem';

import {
  setSortStateInState,
  setSortingInState,
  setIssuesParameters
} from 'actions/issues.actions';

import downArrow from 'assets/images/drop-down.svg';

type ConnectedProps = {
  setSortStateInState: () => void,
  setSortingInState: () => void,
  setIssuesFilter: () => void
};

type OwnProps = {};

type State = {
  isOpen: boolean,
  author: [],
  labels: [],
  milestone: [],
  assignee: [],
  isOpen: boolean,
  isSortOpen: boolean,
  isAssigneeOpen: boolean
};

class SortIssues extends Component<ConnectedProps & OwnProps, State> {
  state = {
    author: [],
    labels: [],
    milestone: [],
    assignee: [],
    isOpen: false,
    isSortOpen: false,
    isAssigneeOpen: true
  };

  componentDidMount() {
    console.log(this.props);
    this.handleSetIssuesParametersFromParams();
  }

  handleSetIssuesParametersFromParams = () => {
    const searchParams = this.extractSearchParams();
    if (!isEmpty(searchParams)) {
      const parametersObject = this.createParametersObject(searchParams);
      const parameters = this.createQueryUrl(parametersObject);
      this.props.setIssuesParameters(parameters);
    }
  };

  extractSearchParams = () => {
    const searchUrl = this.props.location.search.split('?');
    return qs.parse(searchUrl[1]);
  };

  createQueryUrl = parameters => {
    let queryUrl = ``;

    mapKeys(key => {
      if (Array.isArray(parameters[key])) {
        queryUrl += `&${key}=${parameters[key].map(param => param).join(',')}`;
      } else {
        queryUrl += `&${key}=${parameters[key]}`;
      }
    }, parameters);

    return queryUrl;
  };

  createParametersObject = searchParams => {
    const parameters = {};

    mapKeys(key => {
      switch (key) {
        case 'milestone':
          if (this.isItemArray(searchParams[key])) {
            break;
          }
          parameters[key] = searchParams[key];
          break;
        case 'state':
          if (this.isItemArray(searchParams[key])) {
            break;
          }
          parameters[key] = searchParams[key];
          break;
        case 'assignee':
          if (this.isItemArray(searchParams[key])) {
            break;
          }
          parameters[key] = searchParams[key];
          break;
        case 'label':
          parameters['labels'] = searchParams[key];
          break;
        case 'sort':
          // TODO: add sort functionality to common cmp
          if (this.isItemArray(searchParams[key])) {
            break;
          }
          parameters[key] = searchParams[key];
          break;
        case 'direction':
          if (this.isItemArray(searchParams[key])) {
            break;
          }
          parameters[key] = searchParams[key];
          break;
        default:
          break;
      }
    }, searchParams);

    return parameters;
  };

  // TODO: All should be replace by Query string
  setFetchByState = issuesState => {
    this.props.setSortStateInState(issuesState);
  };

  setFetchBySort = sorting => {
    this.props.setSortingInState(sorting);
    this.setState({
      isOpen: false
    });
  };

  toggleSort = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClickOutSide = () => {
    this.setState({
      isOpen: false
    });
  };

  isItemArray = item => {
    return Array.isArray(item);
  };

  handleUrlChange = (parameter, value) => {
    const pathName = this.props.location.pathname;
    const searchParams = this.extractSearchParams();

    if (get(parameter, searchParams)) {
      if (parameter === 'label') {
        // If label is Array
        if (Array.isArray(searchParams[parameter])) {
          if (includes(value, searchParams[parameter])) {
            searchParams[parameter] = searchParams[parameter].filter(
              parameterValue => parameterValue !== value
            );
          } else {
            searchParams[parameter].push(value);
          }
        }

        // If label isn't an Array
        if (!Array.isArray(searchParams[parameter])) {
          if (value === searchParams[parameter]) {
            delete searchParams[parameter];
          } else {
            searchParams[parameter] = [searchParams[parameter], value];
          }
        }
      }

      // If parameter is not a "label"
      if (parameter !== 'label') {
        if (value === searchParams[parameter]) {
          delete searchParams[parameter];
        } else {
          searchParams[parameter] = value;
        }
      }

      // If no parameter
    } else {
      searchParams[parameter] = value;
    }

    const newUrlParams = qs.stringify(searchParams, { arrayFormat: 'repeat' });
    const paramsObject = this.createParametersObject(searchParams);
    const queryParams = this.createQueryUrl(paramsObject);

    this.props.history.push(`${pathName}?${newUrlParams}`);
    this.props.setIssuesParameters(queryParams);
  };

  render() {
    return (
      <SortContainer>
        <IssuesState handleSetFetchByState={this.setFetchByState} />
        <ItemSelectContainer>
          <ItemSelect>
            <BarText>Assignee</BarText>
            <SortIcon />
            <ListSelect
              searchable={true}
              right="0px"
              top="20px"
              isOpen={this.state.isAssigneeOpen}
              items={this.props.repoAssignees}
              handleInputChange={this.handleAssigneesFilter}
              render={assignee => (
                <ListItem
                  key={assignee.id}
                  image={assignee.avatar_url}
                  title={assignee.login}
                  width="20px"
                  height="20px"
                  subject={'assignee'}
                  handleSelect={this.handleUrlChange}
                />
              )}
            />
          </ItemSelect>
          <ItemSelect>
            <BarText>Sort</BarText>
            <SortIcon onClick={this.toggleSort} />
            {this.state.isOpen && (
              <SortDropDown
                handleClickOutSide={this.handleClickOutSide}
                setFetchBySort={this.setFetchBySort}
              />
            )}
          </ItemSelect>
        </ItemSelectContainer>
      </SortContainer>
    );
  }
}

const SortContainer = styled.div`
  background-color: #f7f8fb;
  height: 50px;
  border: 1px solid #d1d5da;
  border-radius-top-right: 3px;
  border-radius-top-left: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BarText = styled.h3`
  color: #586069;
  font-size: 14px;
  font-weight: 400;
`;

const ItemSelectContainer = styled.div`
  display: flex;
`;

const ItemSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:last-child {
    margin-right: 5px;
  }
`;

const SortIcon = styled.div`
  background: url(${downArrow}) no-repeat center;
  width: 13px;
  height: 13px;
  margin: 5px 5px 0 3px;
`;

const mapStateToProps = state => ({
  repoAssignees: state.issues.repoAssignees
});

export default withRouter(
  connect(mapStateToProps, {
    setSortStateInState,
    setSortingInState,
    setIssuesParameters
  })(SortIssues)
);

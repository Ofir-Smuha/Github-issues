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

import { sortings } from 'constants/sort.constants';

import downArrow from 'assets/images/drop-down.svg';

type ConnectedProps = {
  setSortStateInState: () => void,
  setSortingInState: () => void,
  setIssuesFilter: () => void
};

type OwnProps = {};

type State = {
  isOpen: boolean,
  isSortOpen: boolean,
  isAssigneeOpen: boolean,
  isLabelsOpen: boolean,
  isMileStonesOpen: boolean,
  selectedAssignees: [],
  selectedLabels: [],
  selectedMilestones: [],
  selectedSort: []
};

class SortIssues extends Component<ConnectedProps & OwnProps, State> {
  state = {
    isOpen: false,
    isSortOpen: false,
    isAssigneeOpen: false,
    isLabelsOpen: false,
    isMileStonesOpen: false,
    selectedAssignees: [],
    selectedLabels: [],
    selectedMilestones: [],
    selectedSort: []
  };

  componentDidMount() {
    this.handleSetIssuesParametersFromParams();
  }

  componentDidUpdate() {}

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
      isSortOpen: !this.state.isOpen
    });
  };

  handleClickOutSide = () => {
    this.setState({
      isSortOpen: false
    });
  };

  isItemArray = item => {
    return Array.isArray(item);
  };

  handleSortSelect = value => {
    switch (value) {
      case 'Newest':
        return 'created';
      case 'Oldest':
        return 'created-asc';
      case 'Most commented':
        return 'comments';
      case 'Least comments':
        return 'comments-asc';
      case 'Recently updated':
        return 'updated';
    }
  };

  handleUrlChange = (parameter, itemValue, closeModalKey) => {
    console.log(
      'parameter',
      parameter,
      'value',
      value,
      'closeModalKey',
      closeModalKey
    );
    const value =
      parameter === 'sort' ? this.handleSortSelect(itemValue) : itemValue;
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
    if (closeModalKey) {
      this.setState({ [closeModalKey]: false });
    }
  };

  handleItemSelect = (
    parameter,
    value,
    closeModalKey,
    itemId,
    itemsKey,
    isMultiSelect
  ) => {
    this.handleUrlChange(parameter, value, closeModalKey);

    let selectedItems = [...this.state[itemsKey]];

    if (isMultiSelect) {
      selectedItems = selectedItems.includes(itemId)
        ? selectedItems.filter(item => item !== itemId)
        : [...selectedItems, itemId];
    }

    if (!isMultiSelect) {
      selectedItems = selectedItems.includes(itemId) ? [] : [itemId];
    }

    this.setState({ [itemsKey]: selectedItems });
  };

  renderMilestonesDropDown = () => (
    <ItemSelect>
      <BarText>Milestones</BarText>
      <SortIcon onClick={() => this.setState({ isMileStonesOpen: true })} />
      <ListSelect
        searchable={true}
        right="0px"
        top="20px"
        isOpen={this.state.isMileStonesOpen}
        // handleInputChange={this.handleLabelsFilter}
        items={this.props.repoMilestones}
        handleClickOutSide={() => this.setState({ isMileStonesOpen: false })}
        render={milestone => (
          <ListItem
            key={milestone.id}
            isSelected={this.state.selectedMilestones.includes(milestone.id)}
            handleSelect={this.handleItemSelect}
            title={milestone.title}
            itemId={milestone.id}
            closeModalKey="isMileStonesOpen"
            itemsKey="selectedMilestones"
            subject="milestone"
          />
        )}>
        Filter by milestone
      </ListSelect>
    </ItemSelect>
  );

  renderLabelsDropDown = () => (
    <ItemSelect>
      <BarText>Labels</BarText>
      <SortIcon onClick={() => this.setState({ isLabelsOpen: true })} />
      <ListSelect
        searchable={true}
        right="0px"
        top="20px"
        isOpen={this.state.isLabelsOpen}
        // handleInputChange={this.handleLabelsFilter}
        items={this.props.repoLabels}
        handleClickOutSide={() => this.setState({ isLabelsOpen: false })}
        render={label => (
          <ListItem
            key={label.id}
            isSelected={this.state.selectedLabels.includes(label.id)}
            handleSelect={this.handleItemSelect}
            fill={label.color}
            title={label.name}
            itemId={label.id}
            isMultiSelect={true}
            closeModalKey="isLabelsOpen"
            itemsKey="selectedLabels"
            width="15px"
            height="15px"
            subject="label"
          />
        )}>
        Filter by label
      </ListSelect>
    </ItemSelect>
  );

  renderAssigneeDropDown = () => (
    <ItemSelect>
      <BarText>Assignee</BarText>
      <SortIcon onClick={() => this.setState({ isAssigneeOpen: true })} />
      <ListSelect
        searchable={true}
        right="0px"
        top="20px"
        isOpen={this.state.isAssigneeOpen}
        items={this.props.repoAssignees}
        handleInputChange={this.handleAssigneesFilter}
        handleClickOutSide={() => this.setState({ isAssigneeOpen: false })}
        render={assignee => (
          <ListItem
            key={assignee.id}
            isSelected={this.state.selectedAssignees.includes(assignee.id)}
            handleSelect={this.handleItemSelect}
            image={assignee.avatar_url}
            title={assignee.login}
            itemId={assignee.id}
            closeModalKey="isAssigneeOpen"
            itemsKey="selectedAssignees"
            width="20px"
            height="20px"
            subject="assignee"
          />
        )}>
        Filter by who’s assigned
      </ListSelect>
    </ItemSelect>
  );

  renderSortDropDown = () => (
    <ItemSelect>
      <BarText>Sort</BarText>
      <SortIcon onClick={() => this.setState({ isSortOpen: true })} />
      <ListSelect
        right="0px"
        top="20px"
        isOpen={this.state.isSortOpen}
        items={sortings}
        // handleInputChange={this.handleAssigneesFilter}
        handleClickOutSide={() => this.setState({ isSortOpen: false })}
        render={sort => (
          <ListItem
            key={sort.id}
            isSelected={this.state.selectedSort.includes(sort.id)}
            handleSelect={this.handleItemSelect}
            title={sort.title}
            itemId={sort.id}
            closeModalKey="isSortOpen"
            itemsKey="selectedSort"
            subject="sort"
          />
        )}>
        Sort by
      </ListSelect>
    </ItemSelect>
  );

  render() {
    return (
      <SortContainer>
        <IssuesState handleStateSelect={this.handleUrlChange} />
        <ItemSelectContainer>
          {this.renderMilestonesDropDown()}
          {this.renderLabelsDropDown()}
          {this.renderAssigneeDropDown()}
          {this.renderSortDropDown()}
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
  repoAssignees: state.issues.repoAssignees,
  repoLabels: state.issues.repoLabels,
  repoMilestones: state.issues.repoMilestones
});

export default withRouter(
  connect(mapStateToProps, {
    setSortStateInState,
    setSortingInState,
    setIssuesParameters
  })(SortIssues)
);

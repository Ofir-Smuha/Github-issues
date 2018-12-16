import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get } from 'lodash/fp';

class FilterAddBar extends Component {
  handleRedirect = () => {
    const path = get('pathname', this.props.location) + '/new-issue';
    this.props.history.push(path);
  };

  render() {
    return (
      <FilterAddContainer>
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

const NewIssueBtn = styled.div`
  padding: 6px 12px;
  font-weight: 600;
  color: #fff;
  background-image: ${({ theme }) => theme.greenGradient};
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  cursor: pointer;
`;

export default withRouter(FilterAddBar);

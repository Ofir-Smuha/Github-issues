import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { get, size, map } from 'lodash/fp';

import ListSelect from 'components/common/ListSelect';
import Assignee from '../details/Assignee';
import Label from '../../common/Label';
import labelsOptions from 'constants/labels.constans';

import gear from 'assets/images/gear.svg';
import type { OptionLabel } from '../issues.types';

type Props = {};

type State = {
  isLabelsOpen: boolean,
  labels: {}[]
};

class SideBar extends Component<Props, State> {
  state = {
    isLabelsOpen: false,
    labels: [],
    storedLabels: {}
  };

  componentDidMount() {
    this.setState({
      labels: labelsOptions
    });
  }

  toggleState = property => {
    this.setState({
      [property]: !this.state[property]
    });
  };

  // renderAssignees = () => {};

  renderLabels = () => {
    if (size(this.state.storedLabels)) {
      return map(
        label => (
          <LabelBar color={label.color} key={label.id}>
            <LabelText>{label.name}</LabelText>
          </LabelBar>
        ),
        this.state.storedLabels
      );
    }
    return <Info>None yet</Info>;
  };

  handleLabelChange = (params, label) => {
    const labels = [...this.state.labels];
    const storedLabels = { ...this.state.storedLabels };
    const labelIndex = this.state.labels.findIndex(
      stateLabel => label.name === stateLabel.name
    );
    if (get('default', label)) {
      delete labels[labelIndex].default;
      delete storedLabels[label.name];
      this.setState({
        labels: labels,
        storedLabels: storedLabels
      });
    } else {
      labels[labelIndex].default = true;
      storedLabels[label.name] = label;
      this.setState({
        labels: labels,
        storedLabels: storedLabels
      });
    }

    this.setState({
      labels: labels
    });
  };

  render() {
    return (
      <Wrapper>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Assignees</Title>
            <Icon />
            {/*<ListSelect />*/}
          </TitleIconContainer>
          {/*{this.renderAssignees}*/}
        </ItemsContainer>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Labels</Title>
            <Icon onClick={() => this.toggleState('isLabelsOpen')} />
            <ListSelect
              top="23px"
              right="-2px"
              isOpen={this.state.isLabelsOpen}
              items={this.state.labels}
              render={label => (
                <Label
                  handleLabelClick={this.handleLabelChange}
                  key={uuid()}
                  label={label}
                />
              )}>
              Apply labels to this issue
            </ListSelect>
          </TitleIconContainer>
          {this.renderLabels()}
        </ItemsContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 230px;
`;

const ItemsContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #e6ebf1;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const TitleIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 10px;
  margin: 0;
`;

const Icon = styled.div`
  background: url(${gear}) no-repeat center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const LabelBar = styled.div`
  width: 100%;
  background-color: #${({ color }) => color};
  height: 20px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const LabelText = styled.h3`
  font-size: 12px;
  font-weight: 600;
  margin-left: 5px;
`;

const Info = styled.h3`
  color: #586069;
  font-size: 12px;
`;

const mapStateToProps = state => ({});

export default connect(null)(SideBar);

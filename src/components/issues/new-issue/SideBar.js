import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { get, keyBy } from 'lodash/fp';

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

  // renderAssignees = () => {};

  toggleState = property => {
    this.setState({
      [property]: !this.state[property]
    });
  };

  // handleActiveLabel = (params, label) => {
  //   const labelIndex = this.state.labels.findIndex(
  //     labelItem => label.name === labelItem.name
  //   );
  //
  //   const labels = [...this.state.labels];
  //   labels[labelIndex] = { ...labels[labelIndex], default: true };
  //   console.log(labels);
  //   this.setState({
  //     labels: labels
  //   });
  // };

  handleDeActiveLabel = (params, { name }) => {
    const labels = keyBy('name', this.state.labels);
    console.log('LA', labels);
    // const labelIndex = this.state.labels.findIndex(
    //   label => name === label.name
    // );
    //
    // const labels = [...this.state.labels];
    //
    // delete labels[labelIndex].default;
    //
    // console.log(labels);
    // this.setState({
    //   labels: labels
    // });
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
          {this.renderAssignees}
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

const mapStateToProps = state => ({});

export default connect(null)(SideBar);

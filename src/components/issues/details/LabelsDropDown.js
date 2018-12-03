import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { concat, uniqBy, includes } from 'lodash/fp';

import { deleteLabel, addLabel } from 'actions/issues.actions';

import check from 'assets/images/check.svg';
import exit from 'assets/images/exit.svg';

type LabelOption = {
  label: string,
  text: string,
  color: string,
  active: boolean
};

type State = {
  labelOptions: LabelOption[]
};

type OwnProps = {
  labels: {}[],
  match: Object
};

type ConnectedProps = {
  deleteLabel: () => void,
  addLabel: () => void,
  labels: {}[]
};

class LabelsDropDown extends Component<OwnProps & ConnectedProps, State> {
  state = {
    labelOptions: [
      {
        name: 'bug',
        description: "Somthing isn't working",
        color: 'd23b46',
        active: false
      },
      {
        name: 'duplicate',
        description: 'this issue or pull request already exists',
        color: 'cfd3d7',
        active: false
      },
      {
        name: 'enhancement',
        description: 'New feature or request',
        color: 'a2eeef',
        active: false
      },
      {
        name: 'good first issue',
        description: 'Good for newcomers',
        color: '7057ff',
        active: false
      },
      {
        name: 'help wanted',
        description: 'Extra attention is needed',
        color: '008672',
        active: false
      },
      {
        name: 'invalid',
        description: "This dosn'nt seem right",
        color: 'e4e669',
        active: false
      },
      {
        name: 'question',
        description: 'Further information is requested',
        color: 'd876e3',
        active: false
      },
      {
        name: 'wontfix',
        description: 'this will not be worked on',
        color: 'fff',
        active: false
      }
    ]
  };

  renderLabels = (userLabels = []) => {
    const rawLabels = concat(userLabels, this.state.labelOptions);
    const uniqLabels = uniqBy('name', rawLabels);

    return uniqLabels.map(label => (
      <LabelContainer
        key={label.color}
        onClick={() => this.handleActiveLabel(label)}>
        <Active active={'default' in label} />
        <ColorTitleContainer>
          <LabelColor color={label.color} />
          <LabelTitle>{label.name}</LabelTitle>
        </ColorTitleContainer>
        <DeActivate
          active={'default' in label}
          onClick={() => this.handleDeActiveLabel(label)}
        />
      </LabelContainer>
    ));
  };

  handleDeActiveLabel = ({ name }) => {
    this.props.deleteLabel(this.props.match.params, name);
  };

  handleActiveLabel = label => {
    if ('default' in label) {
      return;
    }
    this.props.addLabel(this.props.match.params, label.name);
  };

  render() {
    if (!this.props.labels) {
      return null;
    }
    return <Fragment>{this.renderLabels(this.props.labels)}</Fragment>;
  }
}

const LabelContainer = styled.div`
  position: relative;
  padding: 8px 30px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const ColorTitleContainer = styled.div`
  display: flex;
`;

const LabelTitle = styled.div``;

const Active = styled.div`
  background: url(${check}) no-repeat center;
  width: 13px;
  height: 13px;
  position: absolute;
  top: 10px;
  left: 8px;
  display: none;

  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const DeActivate = styled.div`
  position: absolute;
  background: url(${exit}) no-repeat center;
  width: 10px;
  height: 10px;
  right: 10px;
  top: 12px;
  display: none;
  ${({ active }) =>
    active &&
    `
    display: block;
  `};
`;

const LabelColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: #${({ color }) => color};
  margin-right: 5px;
`;

const Text = styled.h3``;

const mapStateToProps = state => ({
  labels: state.issues.issueLabels
});

export default withRouter(
  connect(mapStateToProps, { deleteLabel, addLabel })(LabelsDropDown)
);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { concat, uniqBy, includes } from 'lodash/fp';

import { deleteLabel } from 'actions/issues.actions';

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
  labels: {}[]
};

type ConnectedProps = {
  deleteLabel: () => void
};

class LabelsDropDown extends Component<OwnProps & ConnectedProps, State> {
  state = {
    labelOptions: [
      {
        name: 'bug',
        // text: "Somthing isn't working",
        color: 'd23b46',
        active: false
      },
      {
        name: 'duplicate',
        // text: 'this issue or pull request already exists',
        color: 'cfd3d7',
        active: false
      },
      {
        name: 'enhancement',
        // text: 'New feature or request',
        color: 'a2eeef',
        active: false
      },
      {
        name: 'good-first-issue',
        // text: 'Good for newcomers',
        color: '7057ff',
        active: false
      },
      {
        name: 'help wanted',
        // text: 'Extra attention is needed',
        color: '008672',
        active: false
      },
      {
        name: 'invalid',
        // text: "This dosn'nt seem right",
        color: 'e4e669',
        active: false
      },
      {
        name: 'question',
        // text: 'Further information is requested',
        color: 'd876e3',
        active: false
      },
      {
        name: 'wontfix',
        // text: 'this will not be worked on',
        color: 'fff',
        active: false
      }
    ]
  };

  renderLabels = (userLabels = []) => {
    const rawLabels = concat(userLabels, this.state.labelOptions);
    const uniqLabels = uniqBy('name', rawLabels);

    return uniqLabels.map(label => (
      <LabelContainer key={label.color}>
        <Active active={'default' in label} />
        <ColorTitleContainer>
          <LabelColor color={label.color} />
          <LabelTitle>{label.name}</LabelTitle>
        </ColorTitleContainer>
        {/*<Text>{label.text}</Text>*/}
        <DeActivate
          active={'default' in label}
          onClick={() => this.handleDeActiveLabel(label)}
        />
      </LabelContainer>
    ));
  };

  handleDeActiveLabel = ({ name }) => {
    console.log(name);
    console.log(this.props.match.params);
    this.props.deleteLabel(this.props.match.params, name);
  };

  render() {
    return (
      <Fragment>
        {this.renderLabels(this.props.labels)}
        {/*{this.state.labelOptions.map(label => (*/}
        {/*<LabelContainer key={label.color}>*/}
        {/*<Active />*/}
        {/*<ColorTitleContainer>*/}
        {/*<LabelColor color={label.color} />*/}
        {/*<LabelTitle>{label.name}</LabelTitle>*/}
        {/*</ColorTitleContainer>*/}
        {/*/!*<Text>{label.text}</Text>*!/*/}
        {/*<DeActivate />*/}
        {/*</LabelContainer>*/}
        {/*))}*/}
      </Fragment>
    );
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

export default withRouter(connect(null, { deleteLabel })(LabelsDropDown));

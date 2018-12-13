import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { addLabel, deleteLabel } from 'actions/issues.actions';

import labelsSelector from 'selectors/labels.selector';

import check from 'assets/images/check.svg';
import exit from 'assets/images/exit.svg';

type OwnProps = {
  match: Object
};

type ConnectedProps = {
  deleteLabel: () => void,
  addLabel: () => void
};

class Label extends Component<OwnProps & ConnectedProps> {
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
    if (!this.props.label) {
      return null;
    }

    const { label } = this.props;

    return (
      <LabelContainer onClick={() => this.handleActiveLabel(label)}>
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

export default withRouter(connect(null, { deleteLabel, addLabel })(Label));

import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash/fp';

import check from 'assets/images/check.svg';
import exit from 'assets/images/exit.svg';

type Props = {
  label: Object,
  match: Object,
  handleLabelClick: () => void
};

const Label = (props: Props) => {
  console.log('LABEL', props.label);
  if (!props.label) {
    return null;
  }

  const { label } = props;
  return (
    <LabelContainer
      onClick={() => props.handleLabelClick(props.match.params, label)}>
      <Active active={'default' in label} />
      <ColorTitleContainer>
        <LabelColor color={label.color} />
        <LabelTitle>{label.name}</LabelTitle>
      </ColorTitleContainer>
      <DeActivate active={get('default', label)} />
    </LabelContainer>
  );
};

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
  ${({ color }) => color`
    background-color: #${color};
  `} margin-right: 5px;
`;

export default withRouter(Label);

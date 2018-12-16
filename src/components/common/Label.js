import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import check from 'assets/images/check.svg';
import exit from 'assets/images/exit.svg';

type Props = {
  label: Object,
  match: Object,
  handleLabelClick: () => void
};

const Label = (props: Props) => {
  if (!props.label) {
    return null;
  }

  const handleLabelClick = label => {
    props.handleLabelClick(props.match.params, label);
  };

  const { label } = props;
  return (
    <LabelContainer onClick={() => handleLabelClick(label)}>
      <Active active={'default' in label} />
      <ColorTitleContainer>
        <LabelColor color={label.color} />
        <LabelTitle>{label.name}</LabelTitle>
      </ColorTitleContainer>
      <DeActivate active={'default' in label} />
    </LabelContainer>
  );
};

Label.propTypes = {
  handleLabelClick: PropTypes.func
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
  background-color: #${({ color }) => color};
  margin-right: 5px;
`;

export default withRouter(Label);

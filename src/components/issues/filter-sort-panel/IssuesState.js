import React from 'react';
import styled from 'styled-components';
import warning from '../../../assets/images/warning-black.svg';
import check from '../../../assets/images/check.svg';

type Props = {
  handleSetFetchByState: () => void
};

const IssuesState = (props: Props) => {
  return (
    <OpenClosedContainer>
      <Open onClick={() => props.handleSetFetchByState('open')}>
        <OpenIcon />
        <BarText>Open</BarText>
      </Open>
      <Closed onClick={() => props.handleSetFetchByState('closed')}>
        <ClosedIcon />
        <BarText>Closed</BarText>
      </Closed>
    </OpenClosedContainer>
  );
};

const OpenClosedContainer = styled.div`
  display: flex;
`;

const Open = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
`;

const BarText = styled.h3`
  color: #586069;
  font-size: 14px;
  font-weight: 400;
`;

const OpenIcon = styled.div`
  background: url(${warning}) no-repeat center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  margin-right: 5px;
`;

const Closed = styled(Open)`
  margin-left: 10px;
`;

const ClosedIcon = styled(OpenIcon)`
  background: url(${check}) no-repeat center;
  width: 18px;
  height: 20px;
`;

export default IssuesState;

import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {};

type State = {
  display: boolean
};

class IssueAction extends Component<Props, State> {
  state = {
    display: false
  };

  render() {
    return (
      <Wrapper>
        <Title>{this.props.children}</Title>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -33px;
  width: 300px;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
`;

const Title = styled.div`
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

export default IssueAction;

import React, { Component } from 'react';
import styled from 'styled-components';

class ListSelect extends Component {
  render() {
    return (
      <Wrapper>
        <Title>{this.props.children}</Title>
        {/*{this.props.itemsRenderer(this.props.items)}*/}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  top: -100%;
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

export default ListSelect;

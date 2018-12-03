import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  items: [],
  children: [],
  itemsRenderer: () => void
};

type State = {
  display: boolean
};

class DropDownContainer extends Component<Props, State> {
  state = {
    display: false
  };

  render() {
    return (
      <Wrapper>
        <Title>{this.props.children}</Title>
        {this.props.itemsRenderer(this.props.items)}
      </Wrapper>
    );
  }
}

DropDownContainer.propTypes = {
  itemsRenderer: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  display: none;
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

export default DropDownContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type OwnProps = {
  searchable: boolean
};

type ConnectedProps = {};

type State = {};

class ListSelect extends Component<OwnProps & ConnectedProps, State> {
  render() {
    return (
      <Wrapper>
        <Title>{this.props.children}</Title>
        {this.props.searchable && (
          <FilterContainer>
            <Filter type="text" placeholder="temporary" />
          </FilterContainer>
        )}
        {/*{this.props.itemsRenderer(this.props.items)}*/}
      </Wrapper>
    );
  }
}

ListSelect.defaultProps = {
  searchable: false
};

ListSelect.PropTypes = {};

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
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

const FilterContainer = styled.div`
  background-color: #f6f8fa;
  padding: 10px;
`;

const Filter = styled.input`
  font-size: 15px;
  border: 1px solid #dfe2e5;
  border-radius: 3px;
  padding: 8px 5px;
  width: 100%;
`;

export default ListSelect;

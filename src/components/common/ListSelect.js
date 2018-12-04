import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type OwnProps = {
  items: [],
  searchable?: boolean,
  placeholder?: string,
  handleInputChange?: string => void
};

type ConnectedProps = {};

type State = {};

class ListSelect extends Component<OwnProps & ConnectedProps, State> {
  render() {
    if (!this.props.items) {
      return null;
    }
    return (
      <Wrapper>
        <Title>{this.props.children}</Title>
        {this.props.searchable && (
          <FilterContainer>
            <Filter
              type="text"
              placeholder={this.props.placeholder}
              onChange={e => this.props.handleInputChange(e)}
            />
          </FilterContainer>
        )}
        {this.props.items.map(item => this.props.render(item))}
      </Wrapper>
    );
  }
}

ListSelect.defaultProps = {
  searchable: true,
  placeholder: 'Search...'
};

ListSelect.propTypes = {
  items: PropTypes.array
};

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

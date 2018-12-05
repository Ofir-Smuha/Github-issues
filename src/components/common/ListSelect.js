import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type OwnProps = {
  isOpen: boolean,
  searchable?: boolean,
  placeholder?: string,
  items: [],
  handleInputChange?: string => void,
  position: Object,
  fallBack?: [] | boolean
};

type ConnectedProps = {};

type State = {};

class ListSelect extends Component<OwnProps & ConnectedProps, State> {
  renderItems = () => {
    if (this.props.items) {
      return this.props.items.map(item => this.props.render(item));
    } else if (this.props.fallBack) {
      if (Array.isArray(this.props.fallBack)) {
        return this.props.fallBack.map(item => this.props.render(item));
      }
      return this.props.fallBack.map(item => this.props.render(item));
    }
  };

  render() {
    const { top, right, left, bottom } = this.props;
    if (!this.props.isOpen || (!this.props.items && !this.props.fallBack)) {
      console.log('null');
      return null;
    }
    return (
      <Wrapper top={top} right={right} left={left} bottom={bottom}>
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
        {this.renderItems()}
      </Wrapper>
    );
  }
}

ListSelect.defaultProps = {
  isOpen: false,
  searchable: false,
  placeholder: 'Search...',
  top: '',
  right: '',
  bottom: '',
  left: '',
  fallBack: false
};

ListSelect.propTypes = {
  items: PropTypes.array.isRequired,
  isOpen: PropTypes.boolean,
  searchable: PropTypes.boolean,
  handleInputChange: PropTypes.func,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string
};

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  top: ${({ left }) => left};
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

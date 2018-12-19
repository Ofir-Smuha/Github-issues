import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type Props = {
  isOpen: boolean,
  searchable?: boolean,
  placeholder?: string,
  items: [],
  handleInputChange?: string => void,
  top: string,
  right: string,
  bottom: string,
  left: string
};

const ListSelect = (props: Props) => {
  const { top, right, left, bottom } = props;
  if (!props.isOpen || !props.items) {
    return null;
  }
  return (
    <Wrapper top={top} right={right} left={left} bottom={bottom}>
      <Title>{props.children}</Title>
      {props.searchable && (
        <FilterContainer>
          <Filter
            type="text"
            placeholder={props.placeholder}
            onChange={e => props.handleInputChange(e)}
          />
        </FilterContainer>
      )}
      {props.items.map(item => props.render(item))}
    </Wrapper>
  );
};

ListSelect.defaultProps = {
  isOpen: false,
  searchable: false,
  placeholder: 'Search...',
  top: '',
  right: '',
  bottom: '',
  left: ''
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

  ${({ top }) =>
    top &&
    `
    top: ${top};
  `} ${({ right }) =>
  right &&
  `
    right: ${right};
  `} 
  ${({ bottom }) => bottom`
    bottom: ${bottom}
  `}  
  ${({ left }) => left`
    left: ${left}
  `}
  
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

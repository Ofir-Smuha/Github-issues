import React, { Component } from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { includes } from 'lodash/fp';

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

class ListSelect extends Component {
  state = {
    inputValue: ''
  };

  render() {
    const { top, right, left, bottom } = this.props;
    if (!this.props.isOpen || !this.props.items) {
      return null;
    }

    return (
      <OutsideClickHandler onOutsideClick={this.props.handleClickOutSide}>
        <Wrapper top={top} right={right} left={left} bottom={bottom}>
          <Title>{this.props.children}</Title>
          {this.props.searchable && (
            <FilterContainer>
              <Filter
                type="text"
                placeholder={this.props.placeholder}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
            </FilterContainer>
          )}

          {this.props.items
            .filter(item =>
              includes(
                this.state.inputValue.toLowerCase(),
                item[this.props.accessKey].toLowerCase()
              )
            )
            .map(item => this.props.render(item))}
        </Wrapper>
      </OutsideClickHandler>
    );
  }
}

// const ListSelect = (props: Props) => {
//   const { top, right, left, bottom } = props;
//
//   if (!props.isOpen || !props.items) {
//     return null;
//   }
//
//   return (
//     <OutsideClickHandler onOutsideClick={props.handleClickOutSide}>
//       <Wrapper top={top} right={right} left={left} bottom={bottom}>
//         <Title>{props.children}</Title>
//         {props.searchable && (
//           <FilterContainer>
//             <Filter
//               type="text"
//               placeholder={props.placeholder}
//               onChange={e => props.handleInputChange(e)}
//             />
//           </FilterContainer>
//         )}
//         {props.items.map(item => props.render(item))}
//       </Wrapper>
//     </OutsideClickHandler>
//   );
// };

ListSelect.defaultProps = {
  isOpen: false,
  searchable: false,
  placeholder: 'Search...',
  top: '',
  right: '',
  bottom: '',
  left: ''
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
  ${({ bottom }) =>
    bottom &&
    `
    bottom: ${bottom}
  `}
  ${({ left }) =>
    left &&
    `
    left: ${left}
  `}
  
  width: 300px;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
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

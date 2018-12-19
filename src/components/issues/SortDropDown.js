import React from 'react';
import styled from 'styled-components';

const SortDropDown = () => {
  return (
    <DropDownContainer isOpen={this.state.isOpen}>
      <TitleContainer>
        <Title>Sort by</Title>
      </TitleContainer>
      <OptionContainer onClick={() => this.setFetchBySort('created')}>
        <OptionTitle>Newest</OptionTitle>
      </OptionContainer>
      <OptionContainer onClick={() => this.setFetchBySort('created-asc')}>
        <OptionTitle>Oldest</OptionTitle>
      </OptionContainer>
      <OptionContainer onClick={() => this.setFetchBySort('comments')}>
        <OptionTitle>Most commented</OptionTitle>
      </OptionContainer>
      <OptionContainer onClick={() => this.setFetchBySort('comments-asc')}>
        <OptionTitle>Least comments</OptionTitle>
      </OptionContainer>
      <OptionContainer onClick={() => this.setFetchBySort('updated')}>
        <OptionTitle>Recently updated</OptionTitle>
      </OptionContainer>
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  display: none;
  position: absolute;
  bottom: -202px;
  right: 0;
  width: 300px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 3px;
  box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);

  ${({ isOpen }) =>
    isOpen &&
    `
    display: block;
  `};
`;

const TitleContainer = styled.div`
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

const Title = styled.h1`
  color: #24292e;
  font-weight: 600;
  font-size: 12px;
`;

const OptionContainer = styled.div`
  background: #fff;
  border-bottom: 1px solid #e1e4e8;
  line-height: 16px;
  padding: 8px 10px;
`;

const OptionTitle = styled(Title)`
  cursor: pointer;

  &:hover {
    color: #0366d6;
  }
`;

export default SortDropDown;

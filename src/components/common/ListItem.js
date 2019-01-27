import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash/fp';

import checkIcon from 'assets/images/check.svg';

type Props = {
  image?: string,
  width: string,
  height: string,
  title: string,
  subject: string,
  closeModalKey: string,
  handleSelect: (string, string, string) => void,
  id: number
};

const ListItem = (props: Props) => {
  const isSelected = get('isSelected', props);
  const {
    subject,
    title,
    image,
    width,
    height,
    closeModalKey,
    itemId,
    itemsKey,
    isMultiSelect = false
  } = props;

  return (
    <ItemContainer
      onClick={() =>
        props.handleSelect(
          subject,
          title,
          closeModalKey,
          itemId,
          itemsKey,
          isMultiSelect
        )
      }>
      <CheckIcon isSelected={isSelected} width={width} height={height} />
      <Image image={image} width={width} height={height} />
      <Title image={image}>{title}</Title>
    </ItemContainer>
  );
};

ListItem.defaultProps = {
  width: '15px',
  height: '15px'
};

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 30px;
  background-color: #fff;
  border-bottom: 1px solid #eaecef;

  &:hover {
    background-color: #0366d6;
    color: #fff;
  }
`;

const Image = styled.div`
  display: none;
  background: url(${({ image }) => image}) no-repeat center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-size: contain;
  ${({ image }) =>
    image &&
    `
    display: block;
  `};
`;

const Title = styled.h3`
  ${({ image }) =>
    image &&
    `
    margin-left: 10px;
  `};
`;

const CheckIcon = styled.div`
  display: none;
  position: absolute;
  left: 5px;
  background: url(${checkIcon}) no-repeat center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-size: contain;
  ${({ isSelected }) =>
    isSelected &&
    `
       display: block;
    `};
`;

export default ListItem;

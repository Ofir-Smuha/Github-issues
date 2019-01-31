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
  isMultiSelect: boolean,
  itemId: number,
  itemsKey: string,
  fill: string
};

const ListItem = (props: Props) => {
  const isSelected = get('isSelected', props);
  const {
    subject,
    title,
    image,
    fill,
    width,
    height,
    closeModalKey,
    itemId,
    itemsKey,
    isMultiSelect
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
      <SelectedIcon isSelected={isSelected} width={width} height={height} />
      <Icon image={image} fill={fill} width={width} height={height} />
      <Title image={image} fill={fill}>
        {title}
      </Title>
    </ItemContainer>
  );
};

ListItem.defaultProps = {
  width: '15px',
  height: '15px',
  isMultiSelect: false
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

const Icon = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 3px;
  ${({ image, fill }) => {
    if (image) {
      return `
        background: url(${image}) no-repeat center;
        background-size: contain;
      `;
    }

    if (fill) {
      return `background-color: #${fill}`;
    }

    return `display: none`;
  }};
`;

const Title = styled.h3`
  font-size: 12px;
  ${({ image, fill }) =>
    (image || fill) &&
    `
    margin-left: 10px;
  `};
`;

const SelectedIcon = styled.div`
  display: ${props => (props.isSelected ? 'block' : 'none')};
  position: absolute;
  left: 5px;
  background: url(${checkIcon}) no-repeat center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default ListItem;

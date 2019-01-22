import React from 'react';
import styled from 'styled-components';

type Props = {
  image?: string,
  width: string,
  height: string,
  title: string,
  subject: string,
  handleSelect: (string, string) => void
};

const ListItem = (props: Props) => {
  const { subject, title, image, width, height } = props;
  return (
    <ItemContainer onClick={() => props.handleSelect(subject, title)}>
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

export default ListItem;

import React, { Component } from 'react';
import styled from 'styled-components';

import ListSelect from 'components/common/ListSelect';

import gear from 'assets/images/gear.svg';

type Props = {};

type State = {};

class SideBar extends Component<Props, State> {
  state = {};

  renderAssignees = () => {};

  render() {
    return (
      <Wrapper>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Assignees</Title>
            <Icon />
            {/*<ListSelect />*/}
          </TitleIconContainer>
          {this.renderAssignees}
        </ItemsContainer>
        <ItemsContainer>
          <TitleIconContainer>
            <Title>Labels</Title>
            <Icon />
            {/*<ListSelect />*/}
          </TitleIconContainer>
        </ItemsContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 230px;
`;

const ItemsContainer = styled.div`
  position: relative;
`;

const TitleIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 10px;
  margin: 0;
`;

const Icon = styled.div`
  background: url(${gear}) no-repeat center;
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default SideBar;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GithubIcon from 'assets/images/github-mark.png';

type Props = {
  userInfo: Object,
  history: Object
};

class Header extends Component<Props> {
  render() {
    const avatarUrl = this.props.userInfo.avatar_url;

    return (
      <Wrapper>
        <ContentContainer>
          <ActionsContainer>
            <Icon onClick={() => this.props.history.push('/')} />
          </ActionsContainer>
          <UserInfoContainer>
            <Avatar avatar={avatarUrl} />
          </UserInfoContainer>
        </ContentContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 12px 0;
  background-color: #24292e;
  color: hsla(0, 0%, 100%, 0.75);
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  max-width: 1012px;
  margin: 0 auto;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  background: url(${GithubIcon}) no-repeat center;
  width: 34px;
  cursor: pointer;
`;

const Avatar = styled.div`
  background: url(${props => props.avatar}) no-repeat center;
  background-size: contain;
  width: 20px;
  height: 20px;
`;

export default withRouter(Header);

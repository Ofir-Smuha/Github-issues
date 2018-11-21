import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GithubIcon from 'assets/images/github-mark.png';

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <ContentContainer>
          <ActionsContainer>
            <Icon onClick={() => this.props.history.push('/')} />
          </ActionsContainer>
          <UserInfoContainer>
            {/*<Avatar avatar={this.props.userInfo} />*/}
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
  height: 36px;
  max-width: 1012px;
  margin: 0 auto;
`;

const UserInfoContainer = styled.div``;

const ActionsContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  background: url(${GithubIcon}) no-repeat center;
  width: 34px;
  cursor: pointer;
`;

const Avatar = styled.div`
  background: url(${props => this.props.avatar}) no-repeat center;
  width: 34px;
`;

export default withRouter(Header);

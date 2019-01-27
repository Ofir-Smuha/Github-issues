import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get } from 'lodash/fp';

import GithubIcon from 'assets/images/github-mark.png';

type ConnectedProps = {
  serInfo: Object
};
type OwnProps = {
  history: Object
};

class Header extends Component<OwnProps, ConnectedProps> {
  render() {
    const user = get('user', this.props);
    return (
      <Wrapper>
        <ContentContainer>
          <ActionsContainer>
            {user && <Icon onClick={() => this.props.history.push('/')} />}
          </ActionsContainer>
          <UserInfoContainer>
            {user && <Avatar avatar={user.avatar_url} />}
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
  margin-bottom: 40px;
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

const mapStateToProps = state => ({
  user: state.user.userInfo
});

export default withRouter(connect(mapStateToProps)(Header));

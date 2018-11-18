// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

type connectedProps = {};

type OwnProps = {};

type State = {};

class Login extends Component<connectedProps & OwnProps, State> {
  state = {};
  render() {
    return (
      <Wrapper>
        <LoginContainer>
          <Title>Login</Title>
          <UserName />
          <Password />
        </LoginContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoginContainer = styled.form``;

const Title = styled.h1``;

const UserName = styled.input``;

const Password = styled(UserName)``;

export default connect(null)(Login);

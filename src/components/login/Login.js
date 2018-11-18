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
          <UserName placeholder="Name" />
          <Password placeholder="Passowrd" />
          <LoginButton>Login</LoginButton>
        </LoginContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.form`
  box-sizing: border-box;
  width: 350px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #5d5d5d;
`;

const UserName = styled.input`
  font-size: 14px;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #cacaca;
  border-radius: 5px;
`;

const Password = styled(UserName)``;

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  color: #262626;
  background: ${({ theme }) => theme.greenGradient};
  border-radius: 5px;
  cursor: pointer;
`;

export default connect(null)(Login);

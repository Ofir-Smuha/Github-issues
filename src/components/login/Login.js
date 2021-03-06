// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import gitHubIcon from 'assets/images/github-mark.png';

type ConnectedProps = {};

type OwnProps = {};

const gitHubUrl =
  'https://github.com/login/oauth/authorize?client_id=6f2d834c1c19457787bf&redirect_uri=https://github123123.herokuapp.com/';

const Login = (props: OwnProps) => {
  return (
    <Wrapper>
      <Link href={gitHubUrl}>
        <ButtonContainer>
          <GitHubIcon />
          <Text>Log in with GitHub</Text>
        </ButtonContainer>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #444444;
  color: #fff;
  padding: 5px 10px;
  border: 1px solid #363636;
  border-radius: 5px;
`;

const GitHubIcon = styled.div`
  background: url(${gitHubIcon}) no-repeat center;
  height: 34px;
  width: 34px;
  margin-right: 10px;
`;

const Text = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color; #fff;
`;

export default Login;

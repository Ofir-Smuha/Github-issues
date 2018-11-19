// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import { authUser } from 'actions/user.actions';

type connectedProps = {};

type OwnProps = {};

type State = {};

const LoginSchema = yup.object().shape({
  name: yup.string().required('User name is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password name is required')
});

class Login extends Component<connectedProps & OwnProps, State> {
  state = {};

  handleLogin = credentials => {
    this.props.authUser(credentials.name);
  };

  render() {
    return (
      <Wrapper>
        <a href="https://github.com/login/oauth/authorize?client_id=6f2d834c1c19457787bf&redirect_uri=http://localhost:3000/issues">
          Github
        </a>
        <Formik
          initialValues={{
            name: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={credentials => {
            this.handleLogin(credentials);
          }}
          render={({ errors, values, handleSubmit, handleChange, touched }) => (
            <LoginContainer onSubmit={handleSubmit}>
              <Title>Login</Title>
              {touched.name &&
                errors.name && <FormError>{errors.name}</FormError>}
              <UserName
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              {touched.password &&
                errors.password && <FormError>{errors.password}</FormError>}
              <Password
                type="text"
                name="password"
                placeholder="Passowrd"
                onChange={handleChange}
              />
              <LoginButton type="submit">Login</LoginButton>
            </LoginContainer>
          )}
        />
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

const FormError = styled.label`
  font-size: 12px;
  color: red;
  margin-bottom: 5px;
`;

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  color: #262626;
  background: ${({ theme }) => theme.greenGradient};
  border-radius: 5px;
  cursor: pointer;
`;

export default connect(null, { authUser })(Login);

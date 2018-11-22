import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import GithubIcon from 'assets/images/mark-github.svg';

type Props = {
  history: Object
};

const Footer = (props: Props) => {
  return (
    <div>
      <Container>
        <LinksContainer>
          <CopyRights>2018 github, Inc.</CopyRights>
          <Link>Terms</Link>
          <Link>Privacy</Link>
          <Link>Security</Link>
          <Link>Status</Link>
          <Link>Help</Link>
        </LinksContainer>
        <Icon onClick={() => props.history.push('/')} />
        <LinksContainer>
          <Link>Concatct GitHub</Link>
          <Link>Pricing</Link>
          <Link>API</Link>
          <Link>Traning</Link>
          <Link>Blog</Link>
          <Link>About</Link>
        </LinksContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1012px;
  margin: 40px auto 0;
  padding: 40px 0;
  font-size: 12px;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: #0366d6;
  text-decoration: none;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const CopyRights = styled.h3`
  margin-right: 16px;
`;

const Icon = styled.div`
  background: url(${GithubIcon}) no-repeat center;
  background-size: contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default withRouter(Footer);

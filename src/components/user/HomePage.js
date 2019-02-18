import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { get } from 'lodash/fp';

import Sidebar from 'components/user/sidebar/Sidebar';
import GlobalLayout from '../common/GlobalLayout';

type OwnProps = {};

class HomePage extends Component<ConnectedProps & OwnProps> {
  render() {
    return (
      <GlobalLayout>
        <Content>
          <Sidebar />
        </Content>
      </GlobalLayout>
    );
  }
}

const Content = styled.div`
  max-width: 1012px;
  margin: 0 auto;
`;

export default withRouter(HomePage);

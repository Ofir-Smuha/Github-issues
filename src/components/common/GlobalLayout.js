import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

class GlobalLayout extends Component {
  render() {
    return (
      <Fragment>
        <HeaderAndContent>
          <Header userInfo={this.props.userInfo} />
          {this.props.children}
        </HeaderAndContent>
        <Footer />
      </Fragment>
    );
  }
}

const HeaderAndContent = styled.div`
  min-height: calc(100vh - 104px);
`;

export default GlobalLayout;

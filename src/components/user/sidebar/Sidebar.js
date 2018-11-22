import React from 'react';
import styled from 'styled-components';

import Repositories from 'components/user/sidebar/Repositories';

type Props = {
  userInfo: Object
};

const Sidebar = (props: Props) => {
  return (
    <Wrapper>
      <Repositories />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Sidebar;

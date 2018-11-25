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

const Wrapper = styled.div`
  width: 333px;
  border-radius: 1px solid #e1e4e8;
`;

export default Sidebar;

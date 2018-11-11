import React from 'react';
import styled from 'styled-components';

type Props = {
  context: Object
};

const SideBar = (props: Props) => {
  return (
    <Wrapper>
      <h1>Here</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 230px;
`;

const AssignContainer = styled.div``;

const LabelsContainer = styled.div``;

const ProjectsContainer = styled.div``;

const MilestoneContainer = styled.div``;

const NotificationsContainer = styled.div``;

export default SideBar;

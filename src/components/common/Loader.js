import React from 'react';
import styled from 'styled-components';
import loader from 'assets/images/loader.gif';

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return <LoaderIcon />;
};

const LoaderIcon = styled.div`
  background: url(${loader}) no-repeat center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

export default Loader;

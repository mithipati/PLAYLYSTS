
import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import styled from 'styled-components';

const LoaderIcon = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -${props => props.size / 2}px;
  margin-left: -${props => props.size / 2}px;
`;

const Loader = (props) => {
  return (
    <LoaderIcon size={props.size} thickness={1.0} color='accent' />
  );
};

export default Loader;

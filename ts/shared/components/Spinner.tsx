import React from 'react';
import styled from 'styled-components/native';

type Props = {
  height?: number;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const StyledActivityIndicator = styled.ActivityIndicator.attrs({
  animating: true,
  size: 'large',
  color: 'green',
})``;

const Spinner = (props: Props) => {
  return (
    <Container {...props}>
      <StyledActivityIndicator />
    </Container>
  );
};

export default Spinner;

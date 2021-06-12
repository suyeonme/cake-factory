import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    width: 30%;
  }
  .MuiFormControl-root {
    margin-bottom: 20px;
  }
`;

// Apply as global Style
export const Title = styled.h1`
  font-family: 'Courier';
`;

export const StyledLink = styled(Link)`
  &,
  &:visited {
    display: inline-block;
    font-family: 'Arial';
    font-size: 14px;
    color: black;
    text-decoration: none;
    margin-top: 20px;
    color: #f73378;
  }
`;

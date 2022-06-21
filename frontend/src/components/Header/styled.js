import styled from "styled-components";
import colors from "../../config/colors";

export const Nav = styled.nav`
  background: ${colors.primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #ffffff;
    margin: 0 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    transition: all 0.3s;
  }

  a:hover {
    color: #cccccc;
  }

  .login-register {
    color: #ffffff;
    margin: 0 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
`;

export const Label = styled.p`
 margin: 0 0 0 5px;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0;
  margin-left: 3px;

  &:hover {
    filter: brightness(100%);
    color: #cccccc;
  }
`

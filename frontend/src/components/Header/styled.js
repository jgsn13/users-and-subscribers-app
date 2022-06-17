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
  }

  a:hover {
    color: #eeeeee;
  }
`;

export const Label = styled.p`
 margin: 0 0 0 5px;
`

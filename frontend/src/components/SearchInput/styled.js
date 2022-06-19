import styled from "styled-components";
import colors from "../../config/colors";

export const InputContainer = styled.div`
  .search-input {
    width: 100%;
    font-size: 20px;
    padding: 5px 10px;
    border: 1px solid ${colors.primaryColor};
    border-radius: 4px;
    outline: none;
    transition: all 0.1s ease-in-out;
  }

  .search-input:focus {
    border-color: ${colors.primaryDarkColor};
    transition: all 0.1s ease-in-out;
  }
`;

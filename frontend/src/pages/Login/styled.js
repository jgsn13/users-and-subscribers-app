import styled from "styled-components";

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #cccccc;
    padding: 0 10px;
    border-radius: 4px;
    margin-bottom: 18px;

    &:focus {
      border: 1px solid blue;
    }
  }
`;


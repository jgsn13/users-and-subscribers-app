import styled from "styled-components";

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #cccccc;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 1px solid blue;
    }
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 5000px;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 30px;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
  }

  span {
    z-index: 2;
  }
`

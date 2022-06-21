import styled from "styled-components";
import colors from "../../config/colors";

export const UserContainer = styled.div`
  margin-top: 20px;

  div.sub-container > span {
    display: block;
  }

  button {
    margin-bottom: 20px;
  }
`;

export const PasswordContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 30px;

  label {
    z-index: 2;
    max-width: 400px;
    background: #ffffff;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: ${colors.primaryColor};
    display: flex;
    flex-direction: column;
    background: #ffffff;
    z-index: 2;

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
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
  }
`
export const ButtonDelete = styled.button`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonCancel = styled.button`
  background-color: #ffffff;
  color: ${colors.primaryColor};
  border: 1px solid ${colors.primaryColor};
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

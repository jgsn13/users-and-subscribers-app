import { Container } from "../../styles/GlobalStyles";
import { Title, Paragraph } from "./styled";

import { useDispatch } from "react-redux";
import { clickAction } from "../../store/loggerSlice";

export default function Login() {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();

    dispatch(clickAction());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Olá</small>
      </Title>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <button type="button" onClick={handleClick}>Enviar</button>
    </Container>
  );
}

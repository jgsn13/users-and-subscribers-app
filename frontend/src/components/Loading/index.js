import { Container } from "./styled";

export default function Loading({ isLoading = false }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>Carregando...</span>
    </Container>
  )
}

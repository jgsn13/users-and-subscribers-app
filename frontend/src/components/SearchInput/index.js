import { InputContainer } from "./styled";

export default function SearchInput({ searchValue, handleChange }) {
  return (
    <InputContainer>
      <input
        className="search-input"
        onChange={handleChange}
        value={searchValue}
        type="search"
        placeholder="Digite o nome..."
      />
    </InputContainer>
  );
}

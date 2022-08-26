import styled from "styled-components";
import UserInput from "../../../components/Utility/Input/UserInput";

const SearchBar = () => {
  return (
    <SearchBarDiv id="search-bar-div">
      <SearchBarInput
        placeholder="Search Your Closet"
        value=""
        onChange={() => {}}
        required={false}
        name="closetSearchBar"
      />
    </SearchBarDiv>
  );
};

export default SearchBar;

const SearchBarInput = styled(UserInput)`
  &.cui-input {
    border-color: blue;
  }
  width: 80%;
`;

const SearchBarDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

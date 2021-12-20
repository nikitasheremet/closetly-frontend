import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav id="navigation-wrapper">
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/account">Account</HeaderLink>
      <HeaderLink to="/login">Login</HeaderLink>
    </Nav>
  );
}

export default Navbar;

const HeaderLink = styled(Link)`
  margin: 0 10px 0 10px;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  height: 2em;
  align-items: center;
  background-color: #dac5f5;
  height: 100%;
`;

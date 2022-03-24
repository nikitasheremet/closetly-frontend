import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const externalHeaderLocations = ["landing", "login", "register"];

function Navbar() {
  const currentPath = useLocation().pathname;
  const isPathExternal =
    currentPath &&
    externalHeaderLocations.filter((pathName) => currentPath.includes(pathName))
      .length > 0;

  return (
    <Nav id="navigation-wrapper">
      {!isPathExternal && (
        <>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/account">Account</HeaderLink>
        </>
      )}

      {isPathExternal && (
        <>
          <HeaderLink to="/login">Login</HeaderLink>
          <HeaderLink to="/login">Register</HeaderLink>
        </>
      )}
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

import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const externalHeaderLocations = ["login", "register"];

function Navbar() {
  const currentPath = useLocation().pathname;
  console.log("currentPath", currentPath);
  const isPathExternal =
    currentPath &&
    externalHeaderLocations.filter((pathName) => currentPath.includes(pathName))
      .length > 0;

  return (
    <Nav id="navigation-wrapper">
      {!isPathExternal && currentPath !== "/" && (
        <>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/account">Account</HeaderLink>
        </>
      )}
      {currentPath === "/" && (
        <>
          <HeaderLink to="/home">See Your Closet</HeaderLink>
        </>
      )}
      {currentPath.includes("login") ||
        (currentPath.includes("register") && (
          <>
            <HeaderLink to="/">Closetly</HeaderLink>
          </>
        ))}

      {currentPath.includes("login") && (
        <>
          <HeaderLink to="/register">Register</HeaderLink>
        </>
      )}
      {currentPath.includes("register") && (
        <>
          <HeaderLink to="/login">Login</HeaderLink>
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

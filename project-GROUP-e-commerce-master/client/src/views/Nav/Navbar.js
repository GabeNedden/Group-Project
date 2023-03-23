import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { BsCart } from "react-icons/bs";
import styled from "styled-components";
import LoginButton from "../../components/LoginButton";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

import image from "./watch.jpg";
import LogoutButton from "../../components/LogoutButton";

const NavBar = () => {
  const { pathname } = useLocation();

  const [sidebar, setSideBar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const showSideBar = () => {
    setSideBar(!sidebar);
    setIsVisible((current) => !current);
  };

  let navigate = useNavigate();
  const CartPage = () => {
    navigate(`/cart`);
  };

  const colorChanger =
    pathname === "/" ? { color: "white" } : { color: "black" };

  return (
    <Wrapper
      style={
        pathname === "/" ? { backgroundImage: `url(${image})` } : { height: 0 }
      }
    >
      <Container style={colorChanger}>
        <Nav>
          <Sidebar style={colorChanger}>
            <div className="navbar">
              <Link style={colorChanger} to="#" className="menu-bars">
                <Hamburger style={{ display: isVisible ? "block" : "none" }}>
                  <FaBars onClick={showSideBar} />
                </Hamburger>
              </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : `nav-menu`}>
              <ul className="nav-menu-items" onClick={showSideBar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiOutlineClose style={{ fontSize: "36px" }} />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.className}>
                      <Link style={colorChanger} to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Sidebar>
          <BrandName>Wearit-Tek</BrandName>
          <LoginButton color={colorChanger} />
          <LogoutButton color={colorChanger} />
          <Cart>
            <BsCart onClick={CartPage} />
          </Cart>
        </Nav>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: no-repeat center/cover;
  background-color: grey;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: none;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  height: 300px;
  max-width: 100%;
  overflow-x: hidden;
  margin: 20px;
  background-color: none;
`;

const Search = styled.span`
  position: absolute;
  top: 55px;
  right: 155px;
  @media (max-width: 600px) {
    right: 120px;
    font-size: 16px;
  }
`;
const Hamburger = styled.span`
  position: absolute;
  top: 50px;
  left: 66px;
  font-size: 32px;
  @media (max-width: 600px) {
    left: 30px;
  }
`;

const Cart = styled.span`
  position: absolute;
  top: 50px;
  right: 110px;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 600px) {
    right: 80px;
    font-size: 26px;
  }
`;

const BrandName = styled.h1`
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-right: 40px;
`;

const Sidebar = styled.span`
  display: flex;
  align-items: center;
  font-size: 22px;
`;

export default NavBar;

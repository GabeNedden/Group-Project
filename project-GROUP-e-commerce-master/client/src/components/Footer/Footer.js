import React from "react";
import styled from "styled-components";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper className="foot">
      <Brands className="brandNames">
        <h1 className="headerDesc">Brands</h1>
        <Brand to={"/products/16384"}>Belkin</Brand>
        <Brand to={"/products/12407"}>Sony</Brand>
        <Brand to={"/products/10759"}>Fitbit</Brand>
        <Brand to={"/products/18732"}>Lg</Brand>
        <Brand to={"/products/18159"}>Casio</Brand>
        <Brand to={"/products/11939"}>Nike</Brand>
        <Brand to={"/products/10713"}>Garmin</Brand>
        <Link to="/brands" className="localLink">
          <p>View All</p>
        </Link>
      </Brands>
      <Team>
        <h1 className="headerDesc">Team Members</h1>
        <a
          className="git"
          href="https://github.com/aygavrilova"
          target="_blank"
        >
          Anna G.
        </a>
        <a className="git" href="https://github.com/GabeNedden" target="_blank">
          Gabe N.
        </a>
        <a
          className="git"
          href="https://github.com/JamesFu7771"
          target="_blank"
        >
          James F.
        </a>
        <a
          className="git"
          href="https://github.com/ThomasKaramanukian"
          target="_blank"
        >
          Thomas K.
        </a>
        <Span></Span>
      </Team>
      <Products className="productNames">
        <h1 className="headerDesc">Products</h1>
        <p>Watches</p>
        <p>Headphones</p>
        <p>Jackets</p>
        <p>Glasses</p>
        <p>Wristbands</p>
        <p>Sensors</p>
        <p>Cameras</p>
        <Link to="/products" className="localLink">
          <p>View All</p>
        </Link>
      </Products>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: #232224;
  height: 400px;
  width: 100%;
`;

const Brands = styled.div`
  color: white;
  font-size: 16px;
  padding-top: 50px;
  line-height: 30px;
  cursor: pointer;
`;

const Brand = styled(Link)`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 16px;
  line-height: 30px;
  text-decoration: none;
  cursor: pointer;
`;

const Team = styled.div`
  color: white;
  font-size: 16px;
  margin-left: 80px;
  padding-top: 50px;
  line-height: 30px;
  cursor: pointer;
`;

const Products = styled.div`
  color: white;
  font-size: 16px;
  margin-left: 80px;
  padding-top: 50px;
  line-height: 30px;
  cursor: default;
`;

const Span = styled.hr`
  border: 2px solid white;
  text-decoration: underline;
  margin-top: 50px;
  cursor: default;
`;

export default Footer;

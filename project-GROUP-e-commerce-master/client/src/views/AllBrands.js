import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./AllBrands.css";
import Footer from "../components/Footer/Footer";

const AllBrands = () => {
  const [companies, setCompanies] = useState(null);
  const [brandProducts, setBrandProducts] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoaded2, setHasLoaded2] = useState(false);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCompanies(data.data);
        setHasLoaded(true);
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(companies);

  let { companyId } = useParams();

  useEffect(() => {
    fetch(`api/companies/${companyId}/items`)
      .then((res) => {
        console.log(companyId);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBrandProducts(data);
        setHasLoaded2(true);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!hasLoaded || !hasLoaded2 || companies === "undefined") {
    return (
      <Loader style={{ height: "100vh", marginTop: "200px" }}>
        <Spinner />
      </Loader>
    );
  }

  return (
    <>
      <Title>Our Brands</Title>
      <Span></Span>
      <Wrapper>
        <div className="container">
          {companies.map((company, index) => {
            return (
              <Brand key={index} to={`/products/${company._id}`}>
                <ul>{company.name}</ul>
              </Brand>
            );
          })}
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 70px;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 70px;
  text-align: center;
`;

const Brand = styled(Link)`
  padding: 10px;
  margin: 10px;
  text-decoration: underline;
  font-weight: 700;
  color: black;
  cursor: pointer;
  &:hover {
    color: orangered;
  }
`;

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 70px;
  margin-left: 175px;
  margin-right: 175px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  font-family: sans-serif;
  font-size: 32px;
`;

const Loader = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  float: left;
  text-align: center;
`;

const Spinner = styled.div`
  margin: 25% auto;
  height: 64px;
  width: 64px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid firebrick;
  border-right-color: transparent;
  border-radius: 50%;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default AllBrands;

import React from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import "./Slider.css";
import WatchCardLarge from "../WatchCardLarge";
import { ProductContext } from "../ProductContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { allWatches, status } = useContext(ProductContext);
  let navigate = useNavigate();
  const ProductsPage = () => {
    navigate(`/products`);
  };
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  if (status === "loaded") {
    const watchData = [];
    while (watchData.length <= 8) {
      watchData.push(allWatches[Math.floor(Math.random() * allWatches.length)]);
    }
    return (
      <>
        <Header>
          We make tech look good. <br /> Like... really good.
        </Header>
        <Desc>
          Wearit-Tek is a global leader in wearable technology, and with over 70
          brand partners, <br />
          we're sure you'll find something you'll love. <br /> With hundreds of
          different products to choose from, Wearit-Tek has you covered.
        </Desc>
        <SubHeader onClick={ProductsPage}>Our Products</SubHeader>
        <Wrapper>
          <Carousel breakPoints={breakPoints}>
            {watchData.map((watch) => {
              return (
                <WatchCardLarge src={watch.imageSrc} watchId={watch._id} />
              );
            })}
          </Carousel>
        </Wrapper>
      </>
    );
  }
  return (
    <div style={{ height: "100vh" }}>
      <Loader>
        <Spinner />
      </Loader>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 45vh;
  margin: 10px;
  margin-bottom: 80px;
`;

const Spinner = styled.div`
  margin: 25% auto;
  margin-top: 1000px;
  height: 64px;
  width: 64px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #2c3639;
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

const Header = styled.h1`
  margin: 80px;
  margin-bottom: 30px;
  margin-right: 80px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  line-height: 50px;
  letter-spacing: 1px;
`;

const Desc = styled.p`
  margin-left: 80px;
  margin-right: 80px;
  font-size: 16px;
  line-height: 28px;
  font-weight: 700;
`;
const SubHeader = styled.h3`
  margin-left: 90px;
  margin-top: 100px;
  font-weight: normal;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 30px;
`;

export default Slider;

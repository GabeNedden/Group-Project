import styled from "styled-components";
import { useContext } from "react";
import { ProductContext } from "../components/ProductContext";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer/Footer";

const ProductDetails = () => {
  //get product id and parse it
  const { id } = useParams();
  const intId = parseInt(id);
  const { allWatches, status, isAuthenticated, currentUser } =
    useContext(ProductContext);
  const { loginWithRedirect } = useAuth0();

  //if the user is logged in we increment the target item in their cart
  //else we send them to the login
  const onSubmit = () => {
    if (isAuthenticated) {
      fetch("/api/carts/increment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: currentUser.email,
          productId: intId,
        }),
      });
    } else {
      loginWithRedirect();
    }
  };

  //if the items have loaded from db, we pick the one matching our page id
  if (status === "loaded") {
    const watch = allWatches.find((watch) => {
      return watch._id === intId;
    });

    //build an array of watches starting 3 spots down the line from the watch were looking at
    let relatedProducts = [];
    let count = 3;
    while (relatedProducts.length < 4) {
      relatedProducts.push(
        allWatches.find((watch) => {
          return watch._id === intId + count;
        })
      );
      //kick out empty spots that come out as undefined
      relatedProducts = relatedProducts.filter((el) => {
        return el !== undefined;
      });
      count++;
    }

    return (
      <>
        <Wrapper>
          <Row>
            <Column>
              <Image src={watch.imageSrc} />
            </Column>
            <Info>
              <Title>{watch.name}</Title>
              <Price>{watch.price}</Price>
              <Description>
                The latest in {watch.category} technology that can be worn on
                your {watch.body_location}!
              </Description>
              <Category>{watch.category}</Category>
              {/* <Location>{watch.body_location}</Location> */}
              <Stock>{watch.numInStock} in Stock</Stock>

              <Purchase onClick={onSubmit}>
                {isAuthenticated ? " Add to Cart" : "Login to Purchase"}
              </Purchase>
            </Info>
          </Row>
          <Column>
            <Row
              style={{
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              We think you'll love these other products!
            </Row>
            <Row>
              {relatedProducts.map((item) => {
                return (
                  <Card to={`/product/${item._id}`}>
                    <Img src={item.imageSrc} />
                    <ItemName>{item.name}</ItemName>
                  </Card>
                );
              })}
            </Row>
          </Column>
        </Wrapper>
        <Footer />
      </>
    );
  } else {
    <Loader style={{ height: "100vh" }}>
      <Spinner />
    </Loader>;
  }
};

export default ProductDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: auto;
  margin-top: 300px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  align-self: center;
`;

const Info = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;
  justify-content: center;
  align-self: center;

  & > * {
    margin-top: 10px;
  }
`;

const Image = styled.img`
  height: 400px;
  overflow: hidden;
  margin-right: 20px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: #a27b5c;
`;

const Price = styled.div`
  font-size: 30px;
  margin-top: 15px;
`;

const Category = styled.div``;

// const Location = styled.div``;

const Stock = styled.div``;

const Description = styled.div``;

const Card = styled(Link)`
  text-decoration: none;
  border: 2px solid #2c3639;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  margin: 10px;

  &:hover {
    cursor: pointer;
    border-color: orangered;
  }
`;

const Purchase = styled.button`
  background-image: linear-gradient(#464d55, #25292e);
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 52px;
  justify-content: center;
  padding: 0 32px;
  transform: translate3d(0, 0, 0);
  transition: all 150ms;
  margin-top: 30px;
  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ItemName = styled.p`
  color: #2c3639;
  margin: auto;
`;

const Img = styled.img``;

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

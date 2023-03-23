import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../Footer/Footer";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [status, setStatus] = useState("loading");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(21);
    const refreshTimeout = 200;

    useEffect(() => {
        fetchNextPage();
    }, []);

    const fetchProducts = () => {
        const url = `/api/items?page=${page}&size=${size}`;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setPage(page + 1);
                setHasNext(res.hasNext);
                setProducts(products.concat(Array.from(res.data)));
                setStatus("loaded");
            })
            .catch((error) => {
                console.log(error);
                setStatus("error");
            });
    };

    const fetchNextPage = () => {
        if (!hasNext) {
            return;
        }

        setTimeout(function () {
            fetchProducts();
        }, refreshTimeout);
    };


    return (
        <>
            <Title>Our Products</Title>
            <Span></Span>
            {
                <ProductsWrapper id="scrollableProductsWrapper">
                    <InfiniteScroll
                        loader={
                            <div style={{ height: "100vh" }}>
                              <Loader>
                                <Spinner />
                              </Loader>
                            </div>
                          }
                        dataLength={{ size }}
                        next={fetchNextPage}
                        hasMore={hasNext}
                    >
                        {products.map((product, index) => {
                            return <Product key={index} product={product}></Product>;
                        })}
                    </InfiniteScroll>
                </ProductsWrapper>

            }
            <Footer />
        </>
    );
};

export default Products;

const ProductsWrapper = styled.div`
  /* overflow: auto; */
  /* height: 300, */
  margin: 0px 5% 100px 10%;
  display: flex;
  justify-content: center;
  float: left;
  /* align-content: center; */
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

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 70px;
  margin-left: 175px;
  margin-right: 175px;
  margin-bottom: 70px;
`;

const OurProducts = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  margin-left: -80px;
  font-family: sans-serif;
  font-size: 32px;
`;

const Spinner = styled.div`
  margin: 25% auto;
  margin-top: 500px;
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

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  font-family: sans-serif;
  font-size: 32px;
`;

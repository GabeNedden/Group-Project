import React, { useEffect, useState } from "react";
import Product from "../components/Products/Product";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import InfiniteScroll from "react-infinite-scroll-component";

const BrandPage = () => {
  const { companyId } = useParams();
  const [products, setProducts] = useState([]);
  const [brandInfo, setBrandInfo] = useState("");
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(21);
  const [hasNext, setHasNext] = useState(true);
  const loaded = status === "loaded";
  const refreshTimeout = 200;

  useEffect(() => {
    try {
      getCompanyInfo();
      fetchProducts();
      setStatus("loaded");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  }, []);

  const getCompanyInfo = () => {
    const url = `/api/companies/${companyId}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBrandInfo(res.company);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  const fetchProducts = () => {
    const url = `/api/companies/${companyId}/items?page=${page}&size=${size}`;
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
        setProducts(products.concat(Array.from(res.items)));
      })
      .catch((error) => {
        console.log(error);
        throw error;
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
      <BrandName>{brandInfo.name}</BrandName>
      <Span></Span>
      <Wrapper>
        {loaded ? (
          <BrandPageView>
            <ProductsList>
              <InfiniteScroll
                dataLength={{ size }}
                next={fetchNextPage}
                loader={
                  <Loader>
                    <Spinner />
                  </Loader>
                }
                hasMore={hasNext}
              >
                {products.map((product, index) => {
                  return <Product key={index} product={product}></Product>;
                })}
              </InfiniteScroll>
            </ProductsList>
          </BrandPageView>
        ) : (
          ""
        )}
      </Wrapper>
      <Space></Space>
      <Footer />
    </>
  );
};

export default BrandPage;

const Wrapper = styled.div`
  align-content: center;
  margin: 0px 5% 300px 8%;
  margin-left: 160px;
`;

const Space = styled.div`
  height: 100px;
`;

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 70px;
  margin-left: 175px;
  margin-right: 175px;
  margin-bottom: 70px;
`;

const BrandPageView = styled.div``;

const BrandName = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  font-family: sans-serif;
  font-size: 32px;
`;

const ProductsList = styled.div``;

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

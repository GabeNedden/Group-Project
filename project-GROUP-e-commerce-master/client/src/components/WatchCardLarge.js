import styled from "styled-components";
import { useContext } from "react";
import { ProductContext } from "../components/ProductContext";
import { Link } from "react-router-dom";

const WatchCardLarge = ({ src, watchId }) => {
  const { allWatches, status } = useContext(ProductContext);

  if (status === "loaded") {
    return (
      <Wrapper to={`/product/${watchId}`}>
        <Image src={src} />
      </Wrapper>
    );
  }

  if (status === "loading") {
    return "Loading";
  }

  if (status === "error") {
    return "error";
  }
};
export default WatchCardLarge;

const Wrapper = styled(Link)`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  margin: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 80%;
`;

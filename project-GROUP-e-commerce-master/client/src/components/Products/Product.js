import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Products.css";

const Product = ({ product }) => {
  return (
    <ProductWrapper to={`/product/${product._id}`}>
      <Img src={product.imageSrc}></Img>
      <Description>
        <Name>{product.name}</Name>
        <Wrapper2>
          <Price>
            <span>Price: </span>
            {product.price}
          </Price>
          <Category>
            <span>Category: </span>
            {product.category}
          </Category>
          <InStock>
            <span>In Stock :</span>
            {product.numInStock}
          </InStock>
        </Wrapper2>
      </Description>
    </ProductWrapper>
  );
};

export default Product;

// const Wrapper1 = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const ProductWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-direction: row;
  float: left;
  height: 200px;
  width: 30rem;
  padding: 10px;
  margin: 12px;
  border: 2px solid #2c3639;
  border-radius: 15px;
  :hover {
    border: 2px solid orangered;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  align-items: flex-start;
  margin: 10px 10px 10px 15px;
`;

const Wrapper2 = styled.div`
  margin: auto;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
`;
const Name = styled.p`
  display: flex;
  font-size: 20px;
  color: #a27b5c;
  font-weight: bold;
  line-height: 1.5rem;
  margin-bottom: 5px;
  font-family: "RolexFont";
`;

const Price = styled.p`
  display: flex;
  color: #2c3639;
  font-size: 15px;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const Category = styled.p`
  display: flex;
  color: #2c3639;
  font-size: 15px;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const InStock = styled.p`
  font-size: 15px;
  display: flex;
  color: #2c3639;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

// _id :6543
// name:"Barska GB12166 Fitness Watch with Heart Rate Monitor"
// price:"$49.99"
// body_location:"Wrist"
// category:"Fitness"
// imageSrc:
// "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAtAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUIAgH/xABQEAABAwMCAwMGCQgGBgsAAAABAAIDBAUREiEGEzEHQVEiYXGBkcEUFTJScpKhsdEjM0JDYoKTokRFVbLC4RYkNVNj8CUmNDZkZXODlLPx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQADAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/ALxREQEREBERA..."
// numInStock: 9
// companyId
// :

import React, { useEffect, useState } from "react";
// import {AiOutlineShoppingCart} from "react-icons/ai";
import styled from "styled-components";
import GetCartInfo from "../components/ShoppingCart/GetCartInfo";
import { useContext } from "react";
import { ProductContext } from "../components/ProductContext";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const { currentUser } = useContext(ProductContext);
  const [clientEmail, setClientEmail] = useState(null);

  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      setClientEmail(currentUser.email);

    };
  }, [currentUser]);

  let gst = 0;
  let qst = 0;
  let total =0;

  if (typeof(subTotal) === "string") {
    setSubTotal(parseFloat(subTotal).toFixed(2));
  }
  if (!isNaN(subTotal))  {
    gst = subTotal*0.05 ;
    qst = subTotal* (0.05 * 0.0998);
    total = subTotal +gst + qst;
  };

  if (clientEmail !== null && clientEmail !== undefined &&  clientEmail.includes("@")) {
    return <Wrapper>
    <ListCartItems>
      { clientEmail !== null 
      ? <GetCartInfo userEmail={clientEmail}  subTotal={subTotal} setSubTotal={setSubTotal} /> 
      : <>Loading...</>
      }
    </ListCartItems>
    <CheckOutSide>
      <EstimtedTotal><h1>Your SubTotal:</h1> <h1>${subTotal.toFixed(2) }</h1></EstimtedTotal>
      <ThisLine></ThisLine>
      <CheckOutInside>
        <SubtotalRight>
 
          <h3>SubTotal after discounts:</h3>
          
          <h3>Shipping:</h3>
          <h3>5% GST:</h3>
          <h3>9.98% QST</h3>
        </SubtotalRight>

        <SubtotalRightAmount>
          <h3>${subTotal.toFixed(2) }</h3>
          <h3>free</h3>
          <h3>{gst.toFixed(2) } </h3>
          <h3>{qst.toFixed(2)}</h3>
        </SubtotalRightAmount>
      </CheckOutInside>
      <ThisLine></ThisLine>
      <EstimtedTotal><h3>Estimated Total:</h3> <h3>${total.toFixed(2)} </h3></EstimtedTotal>
        <Pay>Proceed to Checkout</Pay>
    </CheckOutSide>
    
  </Wrapper>;
  } else {
    return <>Loading ...</>
  };  

};

const Pay = styled.button`
  height: 20px;
  width: 30%;
  margin-left: 35%;
  background-image: linear-gradient(#464d55, #25292e);
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 52px;
  justify-content: center;
  margin-bottom: 100px;
  transform: translate3d(0, 0, 0);
  transition: all 150ms;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ThisLine = styled.div`
  height: 0px;
  border-bottom: 4px solid rgba(212, 212, 212, 1);
`;
const EstimtedTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 91%;
  padding: 0 30px;
  height: 10%;
  background-color: rgba(212, 212, 212, 0.3);
  /* padding-right: 13%; */
  /* border: 4px solid red; */
  /* height:700px; */
  /* margin-left: 57%; */
`;

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 290px;
  margin-left: 175px;
  margin-right: 175px;
  margin-bottom: 70px;
`;

const CheckOutSide = styled.div`
  top: 320px;
  width: 38%;
  height: 700px;
  margin-left: 52%;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* margin-top: 0; */
  gap: 11px;
  /* padding-top: 0; */
  /* border: 4px solid red; */
`;

const CheckOutInside = styled.div`
  width: 100%;
  height: 60%;
  /* height:700px; */
  /* margin-left: 57%; */
  /* border: 3px solid blue; */

  display: flex;
  flex-direction: row;
  gap: 15px;
  /* border: 4px solid red; */
`;

const SubtotalRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 45%;
  padding: 0 30px;
  /* border: 6px solid blue; */
`;

const SubtotalRightAmount = styled(SubtotalRight)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ListCartItems = styled.div`
  width: 55%;
  /* border: 3px solid blue; */
`;

const Wrapper = styled.div`
  margin-top: 200px;
  padding-left: 100px;
  margin-bottom: 100px;
  display: flex;
  padding-right: 100px;
  /* margin-left: 1620px; */
  width: 100vw;
  /* height: 700px; */
  gap: 4px;
  /* border: 3px solid blue; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export default CartPage;

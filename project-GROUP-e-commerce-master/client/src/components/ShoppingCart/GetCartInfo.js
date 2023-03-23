import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleCartItem from "./SingleCartItem";


const GetCartInfo = ({userEmail, subTotal, setSubTotal}) => {
    const [cartInfo, setCartInfo] =useState(null);

    let totalItemsNo = "";

    useEffect(() => {
        try {
            fetch(`/api/cartsEmail/${userEmail}`)
            .then(res => res.json())
            .then(data => data.data)
            .then(info => {

                setCartInfo(info[0]);
            });
        } catch (error) {
            console.log("error:", error);
        };

    }, [userEmail]);

    if (cartInfo === null || cartInfo === undefined) {
        return <>Loading ... </>
    } else {
        console.log("cartInfo:",cartInfo);
        totalItemsNo = Object.values(cartInfo).reduce((a,b) => a+b, 0);

        const itemArr = Object.keys(cartInfo);

        return   <Wrapper>
        <SubTitle><h1>Your Shopping Cart</h1>
            <h3>{totalItemsNo} items &nbsp; &nbsp;</h3>
        </SubTitle>
                
            {totalItemsNo === 0 
            ? <h2>Your shopping cart is currently empty </h2>
            : 
            itemArr.map((itemId, idx) => {
                return <SingleCartItem key={idx} itemId={itemId} itemNo={cartInfo[itemId]} subTotal={subTotal} setSubTotal={setSubTotal} />
                })

            }

        </Wrapper>
    };    
};

const SubTitle = styled.div`
display: flex;
align-items: flex-end;
justify-content: space-between;
border-bottom: 4px solid rgba(212,212,212,1);
`;

const Wrapper = styled.div`
padding-left:20px;
display: flex;
flex-direction: column;
gap: 15px;

`;

export default GetCartInfo;
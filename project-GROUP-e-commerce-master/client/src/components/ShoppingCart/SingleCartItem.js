import { useEffect, useState } from "react";
import styled from "styled-components";
import {useContext } from "react";
import { ProductContext } from "../ProductContext";

const SingleCartItem = ({itemId, itemNo, subTotal, setSubTotal}) => {
    const { currentUser } = useContext(ProductContext);
    console.log("in Single page",itemId, itemNo);
    const [hasLoad, setHasLoad] = useState("loading");
    const [itemInfo, setitemInfo] = useState("");
    const [itemAmount, setItemAmount] = useState(0);
    const [message, setMessage] =useState("");
    // let itemAmount = 0;
    const [newitemNo, setItemNo ] = useState(itemNo);
    let temp = 0;
    let clickValue = 0;
    
    
    useEffect(async () => {
        await fetch(`/api/items/${itemId}`)
        .then(res => res.json())
        .then((data) => {
            setitemInfo(data.data)
            setHasLoad("loaded")
            temp = data.data?.price !== undefined && itemNo * ((data.data.price).slice(1));
            ;
            setItemAmount(temp);
        })
        .catch ((error) => {
            console.log("error:", error)})

        let bb = subTotal+temp;
        await setSubTotal(bb);
    }, [itemId]);

    const addButton =  () => {
        temp = 1;   //flag 1 is add
        clickValue = newitemNo+1;
        clickOp(clickValue);
    };

    const minusButton =  () => {
        temp = 0;  //flag 1 is minus
        clickValue= newitemNo-1;
        clickOp(clickValue);
    };

    const clickOp = async (clickValue) => {
        try {
            await setItemNo(clickValue);
            const unitAmount = parseFloat((itemInfo.price).slice(1));
            if (temp === 1) {
                temp =  subTotal+unitAmount;
                await setItemAmount(itemAmount+unitAmount);
            } else {
                temp =  subTotal- unitAmount;
                await setItemAmount(itemAmount-unitAmount);
            };
            await setSubTotal(temp);
        } catch (error) {
            console.log(error)
        };
        callUpdateDb(clickValue);
    };
    
    useEffect(() => {
        callUpdateDb(newitemNo);
    },[newitemNo]);

    
    
    const callUpdateDb =(clickValue) => {

        fetch ("/api/carts", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userEmail": `${currentUser.email}`,
                "productId": `${itemId}`,
                "quantity": clickValue})
            })
        .then((res) => res.json())
        .then((json) => {
            setMessage(json);
            console.log(message);
        })
        .catch(error => (console.log(error)));
    };
 

    if (hasLoad === "loading" & itemInfo === null){
        return <div>Loading.............</div>
    } else {
    return (<Wrapper>
            <ImageBox>
                <Iimage src={itemInfo.imageSrc}></Iimage>
            </ImageBox>
            <Name>{itemInfo.name}</Name>
            <Quantity>
                <h4>Quantity :</h4>
                <CtrlQuatity>
                    <MinBtn onClick={ newitemNo !== 0 && minusButton }>-</MinBtn>
                    <h4>{newitemNo} </h4>
                    <AddBtn onClick={addButton}>+</AddBtn>
                </CtrlQuatity>
            </Quantity>
            <SubPrice>
                {/* <Price>${itemAmount }</Price> */}
                <Price>{itemInfo.price}/ea</Price>
            </SubPrice>
        </Wrapper>)
    }

};

const MinBtn = styled.button`
border-radius: 5px;
width: 50px;
`;

const AddBtn = styled(MinBtn)``;

const Name = styled.p`
width: 300px;
`;
const Price = styled.p``;

const ImageBox = styled.div`
width: 200px;
margin-left: 40px;
`;

const Iimage = styled.img`
  width: auto;
  height: 130px;
`;



const CtrlQuatity = styled.div`
display: flex;
width: 130px;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 6px;
`;
const Quantity = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 9px;
justify-content: space-between;
`;

const SubPrice = styled(Quantity)``;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
/* border: 2px solid blue; */
gap: 19px;
`;

export default SingleCartItem;
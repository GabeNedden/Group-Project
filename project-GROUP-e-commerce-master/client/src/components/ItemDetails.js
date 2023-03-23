import { useEffect, useState } from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";   


const ItemDetails = () => {
    const [status, setStatus] = useState("loading");
    const [cartStatus, setCartStatus] = useState("loading");
    const [cart, setCart] = useState("false");
    const [itemInfo, setItemInfo] = useState("loading");
    // const { itemId } = useParams();
    const itemId = "6545";


    useEffect(() => {
        fetch(`/api/items/${itemId}`)
        .then(res => res.json())
        .then(data => console.log("data:", data))
        .catch(error => {
            console.log("rerror:", error)
        })

    }, [])


    return <Wrapper>
        <LeftImg></LeftImg>
        <MainInfo></MainInfo>
        ok
        <RightCard></RightCard>
    </Wrapper>

};

const Wrapper = styled.div`

`;

const LeftImg = styled.div`

`;

const MainInfo = styled.div`

`;

const RightCard = styled.div`

`;



export default ItemDetails;
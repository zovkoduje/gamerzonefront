/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "@/icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Box = styled(Link)`
    background-color: #f0f2f5;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    border-radius: 10px;
    img {
        max-width: 100%;
        max-height: 80px;
    }
    @media (max-width: 768px) {
        height: 150px;
        padding: 10px;
        width: calc(100% - 20px); // Subtracting padding and border
    }
`;
const ProductWrapper = styled.div`
    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Title = styled(Link)`
    font-weight: 500;
    font-size: 1.2rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
    height: 2.4em; 
    line-height: 1.2em; 
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
        font-size: 1rem;
        text-align: center;
    }
`;
const ProductInfoBox = styled.div`
    margin-top: 5px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    @media (max-width: 768px) {
        justify-content: center;
        gap: 10px;
    }
`;
const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 800;
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;
export default function ProductBox({_id,title,description,price,images}){
    const{addProduct}=useContext(CartContext);
    const url='/product/'+_id;
    return(
        <ProductWrapper>
            <Box href={url}>
                <div>
                    <img src={images?.[0]} alt=""/>   
                </div>    
            </Box>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>{price}€</Price>
                    <Button $primary onClick={()=>addProduct(_id)} ><CartIcon/></Button>

                </PriceRow>
                
                
            </ProductInfoBox>
        </ProductWrapper>
        
        
    )
}
/* eslint-disable @next/next/no-img-element */
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #000;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0 0 20px;
    font-weight: normal;
    color: white;
    font-size: 2.5rem;
    text-align: center;

    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Description = styled.p`
    color: white;
    font-size: 0.9rem;
    margin-bottom: 20px;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    img {
        max-width: 100%;
        height: auto;
    }
`;

const ButWrapper = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
`;

export default function Featured({product}) {
    const { addProduct } = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(product._id);
    }
    const truncatedDescription = product.description.length > 100
        ? product.description.substring(0, 500) + '...'
        : product.description;

    return (
        <Bg>
            <Center>
                <ColWrapper>
                    <Column>
                        <ImageWrapper>
                            <img src={product.images?.[0]} alt=""/>
                        </ImageWrapper>
                    </Column>
                    <Column>
                        <Title>{product.title}</Title>
                        <Description>{truncatedDescription}</Description>
                        <ButWrapper>
                            <ButtonLink href={'/product/'+product._id} $outline={true} $yellow={true}>Read more</ButtonLink>
                            <Button $primary onClick={addFeaturedToCart} >
                                <CartIcon>
                                    Add to cart
                                </CartIcon>
                            </Button>
                        </ButWrapper>
                    </Column>
                </ColWrapper>
            </Center>
        </Bg>
    );
}
/* eslint-disable @next/next/no-img-element */
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import formatPrice from "@/lib/formatPrice";

const Bg = styled.div`
    background-color: #000;
    padding: 60px 0;
`;

const Eyebrow = styled.div`
    color: #ff0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    margin: 0 0 15px;
    font-weight: 700;
    color: white;
    font-size: 3rem;
    line-height: 1.1;

    @media screen and (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Description = styled.p`
    color: #bbb;
    font-size: 1.1rem;
    line-height: 1.5;
    margin: 0 0 20px;
    max-width: 480px;
`;

const Price = styled.div`
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 25px;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
        text-align: center;
    }
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 360px;
        object-fit: contain;
    }
`;

const ButWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    svg {
        margin-right: 6px;
    }
    @media screen and (max-width: 768px) {
        justify-content: center;
    }
`;

// first two sentences, so the hero stays short
function shortDescription(text = '') {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    if (!sentences) return text;
    return sentences.slice(0, 2).join('').trim();
}

export default function Featured({product}) {
    const { addProduct } = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(product._id);
    }

    return (
        <Bg>
            <Center>
                <ColWrapper>
                    <ImageWrapper>
                        <img src={product.images?.[0]} alt={product.title}/>
                    </ImageWrapper>
                    <div>
                        <Eyebrow>Featured product</Eyebrow>
                        <Title>{product.title}</Title>
                        <Description>{shortDescription(product.description)}</Description>
                        <Price>{formatPrice(product.price)}</Price>
                        <ButWrapper>
                            <Button $yellow onClick={addFeaturedToCart}>
                                <CartIcon/>Add to cart
                            </Button>
                            <ButtonLink href={'/product/'+product._id} $outline={true} $yellow={true}>Read more</ButtonLink>
                        </ButWrapper>
                    </div>
                </ColWrapper>
            </Center>
        </Bg>
    );
}

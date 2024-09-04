import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import GrayBox from "@/components/GrayBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/icons/CartIcon";
import { CartContext } from "@/components/CartContext";
import { useContext } from "react";





const Title=styled.h1`
    font-size:1.5em;

`
const ColWrapper=styled.div`
    display:grid;
    grid-template-columns: 1.1fr 0.9fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    gap:20px;
    margin-top: 40px ;
`
const PriceRow=styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`
const Price=styled.span`
    font-size:1.5rem
`
const GrayBoxx=styled(GrayBox)`
    height: 375px; 
    overflow: hidden;
    
`
export default function ProductPage({product}){
    const {addProduct}=useContext(CartContext);
    return(
        <>
            <Header/>
            <Center>
                <ColWrapper>
                    <GrayBoxx>
                        <ProductImages images={product.images}/>
                    </GrayBoxx>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <Price>
                                {product.price}€
                            </Price>
                                <Button $primary onClick={()=>addProduct(product._id)}><CartIcon/>Add to cart</Button>
                        </PriceRow>
                        
                        
                    </div>
                </ColWrapper>
                

            </Center>
        </>
    )}


    export async function getServerSideProps(context){
        await mongooseConnect();
        const product=await Product.findById(context.query.id);
        return {
            props:{
                product:JSON.parse(JSON.stringify(product)),
            }
        }
    }

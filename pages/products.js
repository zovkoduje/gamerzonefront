import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";


const Title=styled.h1`
    font-size:1.5em;

`

export default function ProductsPage({products}){
    console.log(products);
    return(
        <>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect();
    const products=await Product.find({}, null, {sort:{'_id':-1}});
    console.log(products);
    return{props:{
        products: JSON.parse(JSON.stringify(products)),
    }}
}

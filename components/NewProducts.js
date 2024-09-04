import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";


const Title= styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
    font-weight: 500;
`
export default function NewProducts({ products }) {
    return (
        <Center>
            <Title>Newest in store</Title>
            <ProductsGrid products={products} />
        </Center>
    )
}
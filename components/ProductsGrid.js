import ProductBox from "./ProductBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 30px;
    margin-bottom:100px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        padding: 15px 5px;
    }
`;
export default function ProductsGrid({products}){
    return(
        <StyledProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id} {...product} />
            ))}
        </StyledProductsGrid>
    )
}
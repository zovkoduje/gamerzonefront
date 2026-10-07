import styled from "styled-components";
import Link from "next/link";
import ProductsGrid from "./ProductsGrid";
import Center from "./Center";

const TitleRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 40px 0 0;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
`;

const ShowAll = styled(Link)`
    color: #555;
    text-decoration: none;
    &:hover {
        color: #000;
        text-decoration: underline;
    }
`;

// one row of products per category
export default function NewProducts({ sections }) {
    return (
        <Center>
            {sections.map(section => (
                <div key={section._id}>
                    <TitleRow>
                        <Title>{section.name}</Title>
                        <ShowAll href={'/category/' + section._id}>Show all &rarr;</ShowAll>
                    </TitleRow>
                    <ProductsGrid products={section.products} />
                </div>
            ))}
        </Center>
    )
}

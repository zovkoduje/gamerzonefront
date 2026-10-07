/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import Center from "./Center";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 40px 0 10px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

const Tile = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 20px 25px;
    background: #111;
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    transition: transform 0.2s ease, background 0.2s ease;
    &:hover {
        background: #222;
        transform: translateY(-2px);
    }
    img {
        height: 90px;
        width: 120px;
        object-fit: contain;
        background: #fff;
        border-radius: 8px;
        padding: 5px;
    }
`;

const Name = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
`;

const Count = styled.div`
    color: #ff0;
    font-size: 0.9rem;
    margin-top: 4px;
`;

export default function CategoryTiles({categories}) {
    return (
        <Center>
            <Grid>
                {categories.map(c => (
                    <Tile key={c._id} href={'/category/' + c._id}>
                        <div>
                            <Name>{c.name}</Name>
                            <Count>{c.count} products &rarr;</Count>
                        </div>
                        {c.image && <img src={c.image} alt={c.name}/>}
                    </Tile>
                ))}
            </Grid>
        </Center>
    );
}

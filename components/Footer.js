import styled from 'styled-components';
import Link from 'next/link';
import Center from './Center';

const StyledFooter = styled.footer`
    background-color: #000;
    color: #aaa;
    padding: 40px 0 30px;
    margin-top: 60px;
`;

const Columns = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
`;

const Brand = styled.div`
    color: #fff;
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 8px;
    span {
        color: yellow;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    &:hover {
        color: yellow;
    }
`;

const Disclaimer = styled.div`
    margin-top: 30px;
    padding: 15px 18px;
    border: 1px solid #333;
    border-left: 3px solid yellow;
    border-radius: 6px;
    font-size: 0.85rem;
    line-height: 1.5;
    strong {
        color: yellow;
    }
`;

const Bottom = styled.div`
    border-top: 1px solid #222;
    margin-top: 25px;
    padding-top: 20px;
    font-size: 0.85rem;
`;

export default function Footer() {
    return (
        <StyledFooter>
            <Center>
                <Columns>
                    <div>
                        <Brand>Gamer<span>Zone</span></Brand>
                        <div>Keyboards, mice and headsets for every gamer.</div>
                    </div>
                    <StyledNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart</NavLink>
                    </StyledNav>
                </Columns>
                <Disclaimer>
                     GamerZone is a test project for academic purposes. Don&apos;t put your sensitive information on this site. This is not a real shop.
                </Disclaimer>
                <Bottom>© {new Date().getFullYear()} GamerZone</Bottom>
            </Center>
        </StyledFooter>
    );
}

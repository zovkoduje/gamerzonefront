import styled from 'styled-components';
import Link from 'next/link';

const StyledFooter = styled.footer`
    background-color: #000;
    color: #fff;
    padding: 20px 0;
    text-align: center;
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    display: block; // Changed to block for vertical layout
    margin: 5px 0; // Added margin for spacing
`;

const StyledNav = styled.nav`
    display: flex;
    flex-direction: column; // Changed to column for vertical layout
    align-items: center; // Centered the links
`;

export default function Footer() {
    return (
        <StyledFooter>
            <div>© 2023 GamerZone. All rights reserved.</div>
            <StyledNav>
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/products'}>Products</NavLink>
                <NavLink href={'/categories'}>Categories</NavLink>
                <NavLink href={'/account'}>Account</NavLink>
                <NavLink href={'/cart'}>Cart</NavLink>
                <NavLink href={'/search'}>Search</NavLink>
            </StyledNav>
            <div>We accept all cards as payment.</div>
        </StyledFooter>
    );
}
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import {useContext, useState} from 'react';
import { CartContext } from './CartContext';
import SearchIcon from './SearchIcon';
import { useRouter } from 'next/router';

const StyledHeader = styled.header`
    background-color: #000;
    position: sticky;
    top:0;
`;

const Logo = styled(Link)`
    color: yellow;
    text-decoration: none;
    z-index: 2;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    min-width:20px;
    svg{
        height:20px;
    }
    
    // Add this line to change color when active
    &.active {
        color: yellow;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: 15px;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #333;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        display: ${({ open }) => (open ? 'flex' : 'none')};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
`;

const NavIcon = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;
    z-index: 2;

    @media (max-width: 768px) {
        display: flex;
    }

    div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 2px 0;
        transition: 0.4s;
    }
`;

export default function Header(){
    const {cartProducts} = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return(
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>GamerZone</Logo>
                    <NavIcon onClick={() => setOpen(!open)}>
                        <div />
                        <div />
                        <div />
                    </NavIcon>
                    <StyledNav open={open}>
                        <NavLink href={'/'} className={router.pathname === '/' ? 'active' : ''}>Home</NavLink>
                        <NavLink href={'/products'} className={router.pathname === '/products' ? 'active' : ''}>Products</NavLink>
                        <NavLink href={'/categories'} className={router.pathname === '/categories' ? 'active' : ''}>Categories</NavLink>
                        <NavLink href={'/account'} className={router.pathname === '/account' ? 'active' : ''}>Account</NavLink>
                        <NavLink href={'/cart'} className={router.pathname === '/cart' ? 'active' : ''}>Cart ({cartProducts.length})</NavLink>
                        <NavLink href={'/search'} className={router.pathname === '/search' ? 'active' : ''}><SearchIcon/></NavLink>
                        
                    </StyledNav>
                    
                        
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}
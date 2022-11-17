import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    background: #5FC1AA;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    width: 102vw;
    z-index: 10;
    font-size: 1.2rem;
`

export const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    max-width: 1100px;
    justify-content: center;
    
    @media screen and (max-width: 680px) {
        justify-content: start;
    }
`

export const PagesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LinkContainer = styled(Link)`
    margin-right: 3rem;
    color: white;

    @media screen and (max-width: 680px) {
        display: none;
    }
`

export const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    background: #5FC1AA;
    height: 80px;
    display: flex;
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`
export const PagesContainer = styled.div`
    display: flex;
    margin-left: 50rem;
`
export const LinkContainer = styled(Link)`
    margin-right: 3rem;
    color: white;

`

export const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    margin-left: 2rem;
`
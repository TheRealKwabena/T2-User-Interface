import React from 'react'
import { Nav, NavbarContainer, LogoContainer, PagesContainer, LinkContainer } from './HeaderElements';
import { Logo } from './logo/LogoStyle';


export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  return (
      <Nav>
        <NavbarContainer>
          <LogoContainer to='/'>
            <Logo src={require("./logo/image.png")} />
            <PagesContainer>
              <LinkContainer to={`/appointments`}>
                Appointments
              </LinkContainer>
              <LinkContainer to={`/dentistries`}>
                Dentistries
              </LinkContainer>
              <LinkContainer to={`/about`}>
                About
              </LinkContainer>
              <LinkContainer to={`/login`}>
                Login
              </LinkContainer>
            </PagesContainer>
          </LogoContainer>
        </NavbarContainer>
      </Nav>
  )
}

export default Header;

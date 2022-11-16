import {useState} from 'react'
import { Nav, NavbarContainer, LogoContainer, PagesContainer, LinkContainer } from './HeaderElements';
import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { Logo } from './logo/LogoStyle';

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  return (
    <Nav>
        <NavbarContainer>
          <LogoContainer to='/'>
            <Logo src={require("./logo/image.png")} />
              <div className="text-xl" style={{
                backgroundColor: 'blue',
              }}>
                <div style={{backgroundColor: 'blue'}} onClick={() => {setIsDrawerOpen(!isDrawerOpen)}}></div>
              </div>
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

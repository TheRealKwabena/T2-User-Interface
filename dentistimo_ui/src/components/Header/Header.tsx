import {useState} from 'react'
import { Nav, NavbarContainer, LogoContainer, PagesContainer, LinkContainer } from './HeaderElements';
import { Logo } from './logo/LogoStyle';
import {Link} from 'react-scroll';

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  return (
    <Nav>
        <NavbarContainer>
          <LogoContainer to='/'>
            <Logo src={require("./logo/image.png")} />
            <PagesContainer>
              <Link to='appointments' smooth={true} offset={-110} duration={900}>
                <LinkContainer to={`/`}>
                  Appointments
                </LinkContainer>
              </Link>
              <Link to='dentistries' smooth={true} offset={-110} duration={900}>
                <LinkContainer to={`/`}>
                  Dentistries
                </LinkContainer>
              </Link>
              <Link to='appointments2' smooth={true} offset={-110} duration={900}>
                <LinkContainer to={`/`}>
                  About
                </LinkContainer>
              </Link>
              <LinkContainer to={`/login`}>
                Login
              </LinkContainer>
              <div className="text-xl" style={{
                backgroundColor: 'blue',
                display: 'flex'
              }}>
                <div style={{backgroundColor: 'blue'}} onClick={() => {setIsDrawerOpen(!isDrawerOpen)}}></div>
              </div>
            </PagesContainer>
          </LogoContainer>
        </NavbarContainer>
      </Nav>    
  )
}

export default Header;

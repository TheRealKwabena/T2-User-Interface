import {useState} from 'react'
import { Nav, NavbarContainer, LogoContainer, PagesContainer, LinkContainer } from './HeaderElements';
import { Logo } from './logo/LogoStyle';
import {Link} from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery} from '@mui/material';
import '../styles.css';
import { signOut } from '../../Infrastructure/PMQTTController';

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const reduced = useMediaQuery('(max-width: 690px)');
  const token = localStorage.getItem('TOKEN');

  return (
    <Nav>
      <LogoContainer to='/'>
            <Logo src={require("./logo/image.png")} />
      </LogoContainer>
        { !reduced ? 
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
          {token == null || token == undefined ? <LinkContainer to={`/login`}>Login</LinkContainer> : <LinkContainer to={`/`}><button onClick={() => { signOut(); }}>Sign Out</button></LinkContainer>}
            </PagesContainer>
           : 
            <NavbarContainer>
              <div id='hamburger'>
                <IconButton sx={{color: 'white'}} hidden={true} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <MenuIcon/>
                </IconButton>
              </div>
              <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} anchor={'top'} sx={{
                backgroundColor: 'rgba(0, 100, 100, 0.5)'
              }}>
                <List>
                  <ListItemIcon>
                    <ListItemText>
                    </ListItemText>
                  </ListItemIcon>
                  <Link to='appointments' smooth={true} offset={-110} duration={900}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ListItemText>
                          Appointments
                      </ListItemText>
                    </ListItemIcon>
                    </ListItemButton>
                  </Link>
                  <Link to='dentistries' smooth={true} offset={-110} duration={900}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ListItemText>
                          Dentistries
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                  </Link>
                  <Link to='appointments2' smooth={true} offset={-110} duration={900}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ListItemText>
                          About
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                  </Link>
                </List>
              </Drawer>
            </NavbarContainer>}
      </Nav>    
  )
}

export default Header;

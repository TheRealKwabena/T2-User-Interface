import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'

export interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <nav className="navbar">
      <img style={{width: "20%"}} src={require("../assets/image.png")} alt=""/>
      <div className="menu-option">
        <Link to={`/`}>Home</Link>
      </div>
      <div className="menu-option">
        <Link to={`/about`}>About</Link>
      </div>
      <div className="menu-option">
        <Link to={`/login`}>Login</Link>
      </div>
    </nav>
  )
}

export default Header;

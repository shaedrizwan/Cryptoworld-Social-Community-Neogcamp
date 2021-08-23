import React, { useState } from 'react'
import { Logo } from '../Logo/Logo'
import "./Header.css"
import NavItem from '../NavItem/NavItem'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

function Header() {

    const [showMenu,setShowMenu] = useState(false)

    return (
        <div className="header">
            <div className="header-left">
                <Logo className="logo"/>
            </div>
            <div className="header-right">
                <NavItem Icon={HomeIcon} name="Home" path={"/"}/>
                <NavItem Icon={NotificationsIcon} name="Notifications" path={"/"}/>
                <NavItem Icon={AccountCircleIcon} name="Profile" path={"/profile"}/>
                <NavItem Icon={LockOpenIcon} name="Login" path={"/login"}/>
                <NavItem Icon={LockOpenIcon} name="Signup" path={"/signup"}/>
            </div>
            <div onClick={()=>setShowMenu(toggle=>!toggle)} className="header-hamburger"><MenuIcon/></div>
            {showMenu && <div className="header-menu">
                <NavLink onClick={()=>setShowMenu(false)} className="menu-items" to="/">Home</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} className="menu-items" to="/profile">Profile</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} className="menu-items" to="/login">Login</NavLink>
                <NavLink onClick={()=>setShowMenu(false)} className="menu-items" to="/signup">Signup</NavLink>

            </div>}
        </div>
    )
}

export default Header

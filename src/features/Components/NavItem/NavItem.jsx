import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavItem.css"

function NavItem({Icon,name,path}) {
    return (
        <NavLink to={path} activeStyle={{color:"black"}} className="nav-item">
            {Icon && <Icon style={{fontSize:"large"}}/>}
            <div className="nav-title">{name}</div>
        </NavLink>
    )
}

export default NavItem

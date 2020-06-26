import React from 'react'
import { Navbar as Nav, NavLink } from 'godspeed'
import Ham from './ham'

const Navbar = ({ optionsOpen, setOptions }) => {

  return (
    <Nav className="navbar" title="College Cockpit">
      <NavLink hover="#003045" onClick={() => setOptions(!optionsOpen)}>
        <Ham optionsOpen={optionsOpen} />
      </NavLink>
    </Nav>
  )
}

export default Navbar

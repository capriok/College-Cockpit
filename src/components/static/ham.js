import React from 'react'

const Ham = ({ drawerOpen }) => {
  return (
    <div className="ham">
      <span className={drawerOpen ? "x" : "line"}></span>
      <span className={drawerOpen ? "x hide" : "line"}></span>
      <span className={drawerOpen ? "x" : "line"}></span>
    </div>
  )
}

export default Ham

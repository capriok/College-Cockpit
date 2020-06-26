import React from 'react'

const Ham = ({ optionsOpen }) => {
  return (
    <div className="ham">
      <span className={optionsOpen ? "x" : "line"}></span>
      <span className={optionsOpen ? "x hide" : "line"}></span>
      <span className={optionsOpen ? "x" : "line"}></span>
    </div>
  )
}

export default Ham

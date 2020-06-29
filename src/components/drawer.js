import React, { useState } from 'react'
import { Drawer as Side, Input } from 'godspeed'

const Drawer = ({ drawerOpen, setDrawer }) => {
  const [state, setState] = useState({
    portal: 'https://adfs.rasmussen.edu/adfs/ls?wa=wsignin1.0&wtrealm=urn%3aextranet%3aportal&wctx=https%3a%2f%2fportal.rasmussen.edu%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252F&wreply=https%3a%2f%2fportal.rasmussen.edu%2f_trust%2fdefault.aspx',
    accCenter: 'https://studentstscv.rasmussen.edu/Login.aspx?ReturnUrl=%2f%3fwa%3dwsignin1.0%26wtrealm%3dhttps%253a%252f%252fportalcv.rasmussen.edu%252f%26wct%3d2020-06-24T19%253a41%253a55Z%26wctx%3drm%253d0%2526id%253dpassive%2526ru%253dsecure%252fstudent%252fstuportal.aspx%26AppType%3dPortal%26Role%3dSTUDENT&wa=wsignin1.0&wtrealm=https%3a%2f%2fportalcv.rasmussen.edu%2f&wct=2020-06-24T19%3a41%3a55Z&wctx=rm%3d0%26id%3dpassive%26ru%3dsecure%2fstudent%2fstuportal.aspx&AppType=Portal&Role=STUDENT',
    edit: {
      portal: false,
      accCenter: false
    }
  })
  return (
    <Side className="drawer" open={drawerOpen} onClick={() => setDrawer(false)}>
      <h1 className="title">Options</h1>
      <ul>
        <li
          className="option"
          onClick={() => setState({ ...state, edit: { ...state.edit, portal: !state.edit.portal } })}>
          Portal Link
        </li>
        {!state.edit.portal
          ? <p className="state">{state.portal}</p>
          : <Input
            className="input"
            underlined
            placeholder="Edit Portal Link"
            onChange={e => setState({ ...state, accCenter: e.target.value })} />
        }
        <li
          className="option"
          onClick={() => setState({ ...state, edit: { ...state.edit, accCenter: !state.edit.accCenter } })}>
          Account Center Link
        </li>
        {!state.edit.accCenter
          ? <p className="state">{state.accCenter}</p>
          : <Input
            className="input"
            underlined
            placeholder="Edit Portal Link"
            onChange={e => setState({ ...state, accCenter: e.target.value })} />
        }
      </ul>
    </Side>
  )
}

export default Drawer

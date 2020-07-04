import React, { useState, useEffect, useRef } from 'react'
import WebView from 'react-electron-web-view'
import Ham from './static/ham'

import Planner from './planner'

import { Modal, Input, Button } from 'godspeed'

const AppBar = ({ drawerOpen, setDrawer }) => {
  const [modal, setModal] = useState({
    state: false,
    name: '',
    url: ''
  })
  const [tabs, setTabs] = useState([
    {
      name: 'Planner',
      state: true,
      component: true,
      closable: false
    },
    {
      name: 'Portal',
      src: "https://portal.rasmussen.edu/",
      state: false,
      component: false,
      closable: false
    },
    {
      name: 'Account Center',
      src: "https://portalcv.rasmussen.edu/secure/student/stuportal.aspx",
      state: false,
      component: false,
      closable: false
    },
    {
      name: 'Google',
      src: "https://google.com",
      state: false,
      component: false,
      closable: true
    }
  ])
  const prevTabLength = useRef(tabs.length)

  const activateTab = (i) => {
    let copy = [...tabs]
    copy.forEach((t) => {
      t.state = false
    })
    copy[i].state = true
    setTabs(copy)
  }

  const closeTab = (i) => {
    const newTabs = tabs.filter((_, index) => index !== i)
    setTabs(newTabs)
  }

  const createTab = e => {
    e.preventDefault()
    if (!modal.url) return
    const newTab = {
      name: modal.url,
      src: `https://www.${modal.url}.com`,
      state: false,
      closable: true
    }
    setTabs([
      ...tabs, newTab
    ])
    setModal({ ...modal, state: false })
    prevTabLength.current = tabs.length
  }

  useEffect(() => {
    if (tabs.length > prevTabLength.current) {
      activateTab(tabs.length - 1)
      prevTabLength.current = tabs.length
    }
    console.log(tabs);
    console.log(tabs.length);
  }, [tabs])

  return (
    <>
      <div className="app-bar">
        {tabs.map((t, i) => (
          <div key={i} className={t.state ? "tab active-tab" : "tab"}>
            <span className="tab-name" onClick={() => activateTab(i)}>{t.name}</span>
            {t.closable && <span className="tab-close" onClick={() => closeTab(i)}>x</span>}
          </div>
        ))}
        <div className="new-tab" onClick={() => setModal({ ...modal, state: true })}>+</div>
        <div className="ham-btn" onClick={() => setDrawer(!drawerOpen)}>
          <Ham drawerOpen={drawerOpen} />
        </div>
      </div>
      {tabs.map(({ src, state, component }, i) => (
        component
          ? state && <Planner key={i} style={{ display: 'none' }} />
          : <WebView key={i} className="webview"
            src={src}
            style={state ? {} : { display: 'none' }} />
      ))}
      <Modal open={modal.state} onClick={() => { setModal(false) }}>
        <h1>Create Tab</h1>
        <br />
        <form id="modalForm" onSubmit={e => createTab(e)}>
          {/* <Input
            placeholder="Name"
            vlaue={modal.name}
            onChange={e => setModal({ ...modal, name: e.target.value })}
            autoFocus /> */}
          <Input
            placeholder="URL"
            vlaue={modal.url}
            onChange={e => setModal({ ...modal, url: e.target.value })}
            autoFocus />
        </form>
        <br />
        <Button form="modalForm" type="submit" text="Create" size="xsm" />
      </Modal>
    </>
  )
}

export default AppBar

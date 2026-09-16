import React from 'react'
import { createRoot } from 'react-dom/client'
import RouterApp from './RouterApp.jsx'
import HsPortalPage from './HsPortalPage.jsx'
import './styles.css'
import './pages.css'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')
let path = window.location.pathname
if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
if (!path.startsWith('/')) path = `/${path}`
if (path !== '/' && !path.endsWith('/')) path = `${path}/`

const App = path === '/hs-portaly/' ? HsPortalPage : RouterApp

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

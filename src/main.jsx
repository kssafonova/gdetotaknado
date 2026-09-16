import React from 'react'
import { createRoot } from 'react-dom/client'
import RouterApp from './RouterApp.jsx'
import './styles.css'
import './pages.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>,
)

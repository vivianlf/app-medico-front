import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import List from './components/poder/List'

const root = ReactDOM.createRoot(
  document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div className='index-container'>
      <List />
    </div>
  </React.StrictMode>
)
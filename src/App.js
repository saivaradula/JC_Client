import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import JCComponents from './application'
import './scss/style.scss'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const App = (props) => {
  return (
    <>
      <HashRouter>
        <Suspense fallback={loading}>
          <JCComponents />
        </Suspense>
      </HashRouter>
    </>
  )
}

export default App

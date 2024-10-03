import { useState } from 'react'
import './App.css'
import AppRoutes from './AppRoutes'
import Header from './components/Header'

function App() {
  
  return (
    <>
        <Header />
    <div className='wrapper'>
    <AppRoutes/>
    </div>
    </>
  )
}

export default App

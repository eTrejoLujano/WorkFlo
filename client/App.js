import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <div className='footer-container'>
        <div className='footer'>
            <Footer />
        </div>
      </div>
    </div>
  )
}

export default App

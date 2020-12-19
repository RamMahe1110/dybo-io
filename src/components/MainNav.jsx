import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class MainNav extends Component {
  state = {}
  render() {
    return (
      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="/" className="home-btn">
            DYBO-IO
          </Link>
        </div>
      </nav>
    )
  }
}

export default MainNav

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  state = {
    places: [
      {
        placeName: 'Forest',
        placeUrlFormat: 'forest',
        placeDesc: 'Explore the beautiful forest of Africa and have fun',
        placeBg:
          'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
      },
      {
        placeName: 'Ocean',
        placeUrlFormat: 'ocean',
        placeDesc: 'Feel the blue Ocean of Carribean that will bring you peace',
        placeBg:
          'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        placeName: 'Desert',
        placeUrlFormat: 'desert',
        placeDesc: 'Get a new and fresh life in the giant desert of Arabia',
        placeBg:
          'https://images.unsplash.com/photo-1489573280374-2e193c63726c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
    ],
  }
  render() {
    const { places } = this.state
    return (
      <div className="home-page">
        <div className="main-content">
          <h1 className="title">Where do you wanna go?</h1>
          <div className="places-options">
            {places.map((place, idx) => {
              return (
                <Link key={idx} to={`/${place.placeUrlFormat}/register`}>
                  <div
                    className="place"
                    style={{
                      background:
                        'linear-gradient(rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)), url(' +
                        place.placeBg +
                        ')',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  >
                    <h3 className="place-name">{place.placeName}</h3>
                    <p className="place-info">{place.placeDesc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage

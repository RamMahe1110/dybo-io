import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import MainNav from './components/MainNav'
import Page404 from './pages/Page404'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MainNav />
        <Switch>
          <Route path="/:place/register" component={RegisterPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App

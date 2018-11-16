import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./landingPage/landingPage"
import SinglePortfolio from "./singlePortfolio/singlePortfolio"
import NotFound from "./notFound.js"

class App extends React.Component {

  render() {
    return (
      <Router className="mainWrapper">
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/portfolios/:id" component={SinglePortfolio} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App

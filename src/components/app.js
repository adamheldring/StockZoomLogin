import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./landingPage/landingPage"
import SinglePortfolio from "./singlePortfolio/singlePortfolio"
import NotFound from "./notFound.js"

class App extends React.Component {

  render() {
    return (
      <div className="mainWrapper">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/portfolios/:id" component={SinglePortfolio} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    </div>
    )
  }

}

export default App

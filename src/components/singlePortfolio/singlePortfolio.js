import React from "react"
import { Link } from "react-router-dom"

class SinglePortfolio extends React.Component {

state = {
  portfolioPositions: [],
  availableCash: 0,
  currency: ""
}

componentDidMount() {
  this.getSinglePortfolio()
}

getSinglePortfolio = () => {
  console.log("Getting single portfolio...")
  fetch(`https://beta.stockzoom.com/api/v1/me/portfolios/${this.props.match.params.id}/`, {
    headers: {  Authorization: `Bearer ${sessionStorage.getItem("usertoken")}` }
  }).then(response => response.json())
    .then(userData => {
      this.setState({
        availableCash: userData.available_cash,
        currency: userData.currency,
        portfolioPositions: userData.position
      }, () => console.log("Portfolio: ", this.state.portfolioPositions))
      console.log("Result from DB: ", userData)
    })
    .catch(err => {
      console.log("Reqeust failure: ", err)
    })
}

render() {
  const { portfolioPositions, availableCash, currency } = this.state
  return (
    <div className="myPageView">
      <Link to="/"><h4 className="navBack">&#8592; BACK TO MY PAGE</h4></Link>
      <h1>PORTFOLIO DETAILS</h1>
      <p><strong>ID:</strong> {this.props.match.params.id}</p>
      <p><strong>Available:</strong> { availableCash && `${parseInt(availableCash)} ${currency}`}</p>
      <h2>POSITIONS:</h2>
      {portfolioPositions.length > 0 ?
        (<div className="portfolioList-container--single">
          {portfolioPositions.map((position, index) => (
            <div key={index} className="position-container">
              <h4 className="position-name">{position.instrument.name.toUpperCase()}</h4>
              <p>
                <strong>Kind:</strong> {position.instrument.kind}<br />
                <strong>Rating:</strong> {position.instrument.rating}
              </p>
              <div className="value-section">
                <table>
                  <thead>
                    <tr><th>PRICE:</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Today:</td>
                      <td>{position.instrument.price_today}{" "}{position.instrument.currency}</td>
                    </tr>
                    <tr>
                      <td>Open:</td>
                      <td>{position.instrument.price_open}{" "}{position.instrument.currency}</td>
                    </tr>
                    <tr>
                      <td>High:</td>
                      <td>{position.instrument.price_high}{" "}{position.instrument.currency}</td>
                    </tr>
                    <tr>
                      <td>Low:</td>
                      <td>{position.instrument.price_low}{" "}{position.instrument.currency}</td>
                    </tr>
                    <tr>
                      <td>Close:</td>
                      <td>{position.instrument.price_close}{" "}{position.instrument.currency}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="trendArrow-container">
                  {(position.instrument.price_close >= position.instrument.price_open) ?
                    <img className="trendArrow"src="../arrowup.png" alt="Up trend"/>
                    : <img className="trendArrow" src="../arrowdown.png" alt="Down trend" />
                  }
                </div>
              </div>
              <p>
                {position.instrument.company &&
                  position.instrument.company.description}
              </p>
            </div>
          ))}
        </div>)
        :
        (<p>Loading...</p>)
      }
    </div>
  )
}

}

export default SinglePortfolio

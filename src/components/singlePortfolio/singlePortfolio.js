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
      <Link to="/"><h4 className="navBack">&#8592; GO BACK</h4></Link>
      <h2>PORTFOLIO DETAILS</h2>
      <h4>ID: {this.props.match.params.id}</h4>
      <h4>Available Cash: { availableCash && `${parseInt(availableCash)} ${currency}`}</h4>
      <h3>Positions:</h3>
      {portfolioPositions.length > 0 ?
        (<div className="portfolioList-container--single">
          {portfolioPositions.map((position, index) => (
            <div key={index} className="position-container">
              <h4>{position.instrument.name}</h4>
              <p>PRICE:</p>
              <ul>
                <li>
                  Today: {position.instrument.price_today}{" "}
                  {position.instrument.currency}
                </li>
                <li>
                  Opening: {position.instrument.price_open}{" "}
                  {position.instrument.currency}
                </li>
                <li>
                  High: {position.instrument.price_high}{" "}
                  {position.instrument.currency}
                </li>
                <li>
                  Low: {position.instrument.price_low}{" "}
                  {position.instrument.currency}
                </li>
                <li>
                  Closing: {position.instrument.price_close}{" "}
                  {position.instrument.currency}
                </li>
              </ul>
              <p>Kind: {position.instrument.kind}</p>
              <p>Rating: {position.instrument.rating}</p>

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

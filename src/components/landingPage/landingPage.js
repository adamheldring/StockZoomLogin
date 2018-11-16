import React from "react"
import { Link } from "react-router-dom"

class LandingPage extends React.Component {

state = {
  password: "berkshirehathaway2018",
  email: "warren.buffet@willandskill.se",
  loggedin: false,
  portfolioList: []
}

componentDidMount() {
  if (sessionStorage.getItem("usertoken")) {
      this.getPortfolioList()
      this.setState({
        loggedin: true
      })
    console.log('There is a token')
  } else {
    console.log('There is NO token')
  }

}

handleChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  }, () => {
    console.log(this.state)
  })
}

loginUser = e => {
  e.preventDefault()
  console.log("Login in...")
  const user = {
    password: this.state.password,
    email: this.state.email
  }
  console.log(user)
  console.log(JSON.stringify(user))

  fetch("https://beta.stockzoom.com/api-token-auth/", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(user)
  }).then(response => response.json())
    .then(userData => {
      console.log(userData)
      sessionStorage.setItem("usertoken", userData.token)
      this.getPortfolioList()
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
}

getPortfolioList = () => {
  console.log("Getting portfolio list...")
  fetch(`https://beta.stockzoom.com/api/v1/me/portfolios/`, {
    headers: {  Authorization: `Bearer ${sessionStorage.getItem("usertoken")}` }
  }).then(response => response.json())
    .then(userData => {
      this.setState({
        portfolioList: userData.results,
        loggedin: true
      }, () => console.log("StateArray: ", this.state.portfolioList))
      console.log("Portfolio: ", userData)
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
}

render() {
  const { email, password, loggedin, portfolioList} = this.state
  return (
    <div className="landingWrapper">
      {(portfolioList.length > 0) ?
        <div className="myPageView">
          <h1>MY STOCKS PAGE</h1>
          <h2>WELCOME {portfolioList[0].user.first_name.toUpperCase()}</h2>
          <h2>PORTFOLIO STATUS:</h2>
          {portfolioList && portfolioList.map((listing, index) => {
            return (
              <Link key={index} to={`/portfolios/${listing.id}`}>
                <p>
                  Portfolio {listing.id} with {listing.position.length} positions
                </p>
              </Link>
            )
          })}
        </div>
        :
        <div className="formContainer formContainer--signin">
          <h1 className="mainHeading">LOGIN:</h1>
          <form name="loginForm" className="userForm" onSubmit={this.loginUser}>
            <input type="text" name="email" value={email} placeholder="E-mail" onChange={this.handleChange} required />
            <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required />
            <button type="submit">Login</button>
          </form>
        </div>}
    </div>
  )
}

}

export default LandingPage

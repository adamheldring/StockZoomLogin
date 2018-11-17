import React from "react"
import { Link } from "react-router-dom"

class LandingPage extends React.Component {

state = {
  password: "berkshirehathaway2018",
  email: "warren.buffet@willandskill.se",
  portfolioList: []
}

componentDidMount() {
  if (sessionStorage.getItem("usertoken")) {
    this.getPortfolioList()
    console.log("There is a token")
  } else {
    console.log("There is NO token")
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
    .catch(err => {
      console.log("Reqeust failure: ", err)
    })
}

getPortfolioList = () => {
  console.log("Getting portfolio list...")
  fetch("https://beta.stockzoom.com/api/v1/me/portfolios/", {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("usertoken")}` }
  }).then(response => response.json())
    .then(userData => {
      this.setState({
        portfolioList: userData.results
      }, () => console.log("StateArray: ", this.state.portfolioList))
      console.log("Portfolio: ", userData)
    })
    .catch(err => {
      console.log("Reqeust failure: ", err)
    })
}

logout = () => {
  console.log("Logging out...")
  sessionStorage.removeItem("usertoken")
  this.setState({ portfolioList: [] })
}

render() {
  const { email, password, portfolioList} = this.state
  return (
    <div>
      {(portfolioList.length > 0) ?
        <div className="myPageView">
          <h1 className="mainHeading">MY PAGE</h1>
          <h2>WELCOME {portfolioList[0].user.first_name.toUpperCase()}</h2>
          <div className="portfolioList-container">
            <h4>{`YOU HAVE ${portfolioList.length} PORTFOLIOS`}</h4>
            {portfolioList && portfolioList.map((listing, index) => {
              return (
                <Link key={index} to={`/portfolios/${listing.id}`}>
                  <div className="portfolioListing">
                    <p>
                      Portfolio {String.fromCharCode(65 + index)} with {listing.position.length} positions
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <button className="input input__button" onClick={this.logout} type="button">Log out</button>
        </div>
        : <div className="formContainer">
          <h1 className="mainHeading">LOGIN</h1>
          <form name="loginForm" className="userForm" onSubmit={this.loginUser} className="signinForm">
            <input className="input input__field" type="email" name="email" value={email} placeholder="E-mail" onChange={this.handleChange} required />
            <input className="input input__field" type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required />
            <button className="input input__button" type="submit">Login</button>
          </form>
        </div>}
    </div>
  )
}

}

export default LandingPage

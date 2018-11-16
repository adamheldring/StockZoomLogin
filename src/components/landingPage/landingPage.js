import React from "react"

class LandingPage extends React.Component {

state = {
  password: "berkshirehathaway2018",
  email: "warren.buffet@willandskill.se",
  loggedin: false,
  portfolioList: []
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
      "Content-Type": "application/json",
      "Accept": "application/json"
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
    <div className="mainWrapper">
      {loggedin ?
        <div className="myPageView">
          <h1>WELCOME {portfolioList[0].user.first_name.toUpperCase()}</h1>
          <h2>PORTFOLIO STATUS:</h2>
          {portfolioList && portfolioList.map(listing => {
            return <p>{listing.id}</p>
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

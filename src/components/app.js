import React from "react"

class App extends React.Component {

state = {
  password: "berkshirehathaway2018",
  email: "warren.buffet@willandskill.se",
  loggedin: false
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
  const tokenBearer = `Bearer ${sessionStorage.getItem("usertoken")}`
  console.log("Getting portfolio list...")
  fetch(`https://beta.stockzoom.com/api/v1/me/portfolios/`, {
    headers: {  Authorization: tokenBearer }
  }).then(response => response.json())
    .then(userData => {
      this.setState({ loggedin: true })
      console.log("Portfolio: ", userData)
    })
    .catch((err) => {
      console.log("Reqeust failure: ", err)
    })
}

render() {
  const { email, password, loggedin } = this.state
  return (
    <div className="mainWrapper">
      {loggedin ?
        <div className="myPageView">
          <h1>WELCOME {email}</h1>
          <p>You are logged in.</p>
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

export default App

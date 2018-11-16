import React from "react"
import { Link } from "react-router-dom"

class NotFound extends React.Component {

render() {
    return (
      <div>
        <h2>No such page... </h2>
        <Link to="/"><h2>&#8592; GO BACK</h2></Link>
      </div>
    )
}

}

export default NotFound

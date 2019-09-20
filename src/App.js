import React, { Component } from "react"
// import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => {console.log(json); return json;})
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  fetchInstagram = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => {console.log(json); return json;})
      .then(json => this.setState({ loading: false, msg: json[0].link }))
  }

  render() {
    // const { loading, msg } = this.state
    return (<div></div>)
    // return (
    //   <p>
    //     <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
    //     <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
    //     <button onClick={this.fetchInstagram("instagram")}>{loading ? "Loading..." : "Get Instagram"}</button>
    //     <br />
    //     <span>{msg}</span>
    //   </p>
    // )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h3>
            <a href="https://instagram.com/plain.site">plain.site</a>
          </h3>
          <div>
            <span className="url" >https://plainest.site</span>
          </div>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App

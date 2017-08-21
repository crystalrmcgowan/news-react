import React, { Component } from "react"
import Feed from "./Feed"
import Loader from "./Loader"
import "../App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomFeed: [],
      feed: [],
      loader: <Loader />,
      fav: ""
    }
    this.randomizer = this.randomizer.bind(this)
  }

  randomizer() {
    // We want to render a set of six random news headlines from the API data.
    // We can simply use Math.floor() to create a random set of healines, but
    // one side effect is that we get duplicates. Therefore, we use the method below to
    // remove duplicates.
    let newsFeed = this.state.feed
    let tmp = newsFeed.slice(newsFeed)
    let randomArray = []
    // We use a for loop to iterate over the length of the array six time.
    // Then we grab a random news headline in each iteration, removing duplicates.
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * tmp.length)
      let removed = tmp.splice(index, 1)
      // Since we are only removing one element
      randomArray.push(removed[0])
    }

    // Set state. When the button is clicked, set the state for randomFeed and the loader.
  }

  componentWillMount() {
    // Set your API URL with the API key.
    let url =
      "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=4a751167d3d741a491fca71499e3d4f4"
    // We use regex to extra website name.
    let extract = url.match(/source=\=*(.*?)\s*&s/).pop()
    // We set site name to state.
    this.setState({ site: extract })
    // Fetch data from API
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let articles = data.articles
        this.setState({ feed: articles })
      })
  }

  render() {
    return (
      <div className="App row">
        <div className="col-md-12 hd">
          <h1 className="hd-title">
            {this.state.site}
          </h1>
          <h2 className="hd-sub">News Randomizer</h2>
        </div>
        <Feed feed={this.state.feed} randomFeed={this.state.randomFeed} />
        {/* Pass in the child component*/}
        {/* Share state with the child*/}
        {/* Your code here*/}
      </div>
    )
  }
}

export default App

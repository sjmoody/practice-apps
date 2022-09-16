import React from "react";
import { render } from "react-dom";
import F1 from "./components/F1.jsx"
import F2 from "./components/F2.jsx"
import F3 from "./components/F3.jsx"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stage: 'home'
    }
  }
  render() {
    let stage = this.state.stage;
    if (stage === 'home') {
      return (
        <div>
          <p>Home page</p>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      );
    } else if (stage === 'F1') {
      return (
        <div>
          <F1 />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )


    } else if (stage === 'F2') {
      return (
        <div>
          <F2 />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else if (stage === 'F3') {
      return (
        <div>
          <p>Hello, World from the Component!</p>
          <F3 />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else {
      return (
        <div>
          <p>Buying stage is: {stage}</p>
          <F1 />
          <F2 />
          <F3 />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      );
    }


  }

}
render(<App />, document.getElementById("root"));

// TODO
// - Convert this into a React Component
// - Store view state (Home, F1, F2, F3, Confirmation)
// - Switch render depending on view state
// - Add Checkout button

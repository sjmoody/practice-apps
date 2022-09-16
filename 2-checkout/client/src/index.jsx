import React from "react";
import { render } from "react-dom";

render(
  <div>
    <p>Hello, World!</p>
    <p>
      <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p>
  </div>,
  document.getElementById("root")
);

// TODO
// - Convert this into a React Component
// - Store view state (Home, F1, F2, F3, Confirmation)
// - Switch render depending on view state
// - Add Checkout button

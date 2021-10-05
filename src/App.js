import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Admin} path="/admin" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

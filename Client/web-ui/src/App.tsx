import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="App">

      <Header />
  
      <Switch>
        <Route path="/">
          <Main />
        </Route>

      </Switch>

      <Footer />
    </div>
  );
};

export default App;

import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import "./App.scss";
import { Footer } from "./components/Footer";
import { HeaderHome } from "./components/HeaderHome";
import { Main } from "./components/Main";

const App = () => {
  return (
    <div className="App">

      <Switch>
        <Route path="/">
          <HeaderHome />
          <Main />
        </Route>

        
      </Switch>

      <Footer />
    </div>
  );
};

export default App;

import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <Header />
        <Body />
      </div>
    </Provider>
  );
}

export default App;

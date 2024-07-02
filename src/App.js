import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from './components/MainContainer';
import Watch from "./components/Watch";

function App() {

  const appRouter = createBrowserRouter([{
    path: '/',
    element: <Body/>,
    children: [
      {
        path:'/',
        element: <MainContainer/>
      },
      {
        path:'watch',
        element: <Watch/>
      }
    ]
  }])

  return (
    <Provider store={store}>
      <div className="">
        <Header />
        <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  );
}

export default App;

import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./utils/store";
import "./App.css";
import Body from "./components/Body";
import Spinner from "./components/Spinner";

// Lazy load route-based components
const MainContainer = lazy(() => import("./components/MainContainer"));
const Watch = lazy(() => import("./components/Watch"));
const Login = lazy(() => import("./components/Login"));
const SearchPage = lazy(() => import("./components/SearchPage"));
const ChannelScreen = lazy(() => import("./components/ChannelScreen"));
const LikedVideo = lazy(() => import("./components/LikedVideo"));
const SavedVideos = lazy(() => import("./components/SavedVideos"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Spinner />}>
              <MainContainer />
            </Suspense>
          ),
        },
        {
          path: "watch",
          element: (
            <Suspense fallback={<Spinner />}>
              <Watch />
            </Suspense>
          ),
        },
        {
          path: "results",
          element: (
            <Suspense fallback={<Spinner />}>
              <SearchPage />
            </Suspense>
          ),
        },
        {
          path: "channel",
          element: (
            <Suspense fallback={<Spinner />}>
              <ChannelScreen />
            </Suspense>
          ),
        },
        {
          path: "like",
          element: (
            <Suspense fallback={<Spinner />}>
              <LikedVideo />
            </Suspense>
          ),
        },
        {
          path: "watchlater",
          element: (
            <Suspense fallback={<Spinner />}>
              <SavedVideos />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />
        </Suspense>
      ),
    },
  ]);

  return (
    <Provider store={store}>
      <div className="app-container">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;

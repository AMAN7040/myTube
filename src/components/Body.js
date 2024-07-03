import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div>
      <Header />
      <div className="flex" style={{ backgroundColor: "#141414" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;

import React from "react";
import Header from "./components/Header";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../../tools/buttons/Button";
import OutlineButton from "../../tools/buttons/OutlineButton";
import IconButton from "../../tools/buttons/IconButton";
import MenuIcon from "../../tools/icons/MenuIcon";
import IconOutlineButton from "../../tools/buttons/IconOutlineButton";
import HomeIcon from "../../tools/icons/HomeIcon";
import MailIcon from "../../tools/icons/MailIcon";
import DocumentIcon from "../../tools/icons/DocumentIcon";
import Footer from "./components/Footer";

const Main = () => {
  const navItems = (
    <>
      <NavLink className={"lg:mx-5 lg:my-0 my-2"}>
        <IconButton className={"w-full lg:w-auto"}>
          <HomeIcon />
          Home
        </IconButton>
      </NavLink>
      <NavLink className={"lg:mx-5 lg:my-0 my-2"}>
        <IconButton className={"w-full lg:w-auto"}>
          <MailIcon />
          Contact Us
        </IconButton>
      </NavLink>
      <NavLink className={"lg:mx-5 lg:my-0 my-2"}>
        <IconButton className={"w-full lg:w-auto"}>
          <DocumentIcon />
          Documentation
        </IconButton>
      </NavLink>
    </>
  );

  return (
    <div>
      <Header navItems={navItems}></Header>
      <hr className="w-[90%]  border border-[steelblue] border-solid rounded-lg  mx-auto" />
      <div className="drawer">
        <input id="mainDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
        <div className="drawer-side">
          <label htmlFor="mainDrawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-52 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {navItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

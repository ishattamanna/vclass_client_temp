import React from "react";
import IconCoverButton from "../../../tools/buttons/IconCoverButton";
import MenuIcon from "../../../tools/icons/MenuIcon";
import IconOutlineCoverButton from "../../../tools/buttons/IconOutlineCoverButton";
import { Link } from "react-router-dom";
import MessageIcon from "../../../tools/icons/MessageIcon";
import IconOutlineCoverLabel from "../../../tools/labels/IconOutlineCoverLabel";

const DashboardHeader = () => {
  return (
    <div className="navbar bg-[steelblue] text-primary-content">
      <IconOutlineCoverLabel
        className={"lg:hidden"}
        htmlFor={"dashboardDrawer"}
      >
        <MenuIcon />
      </IconOutlineCoverLabel>
      <Link to={"/vchat"} className="ml-auto">
        <IconOutlineCoverButton>
          <MessageIcon className={"w-6 h-6"} />
        </IconOutlineCoverButton>
      </Link>
      {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
    </div>
  );
};

export default DashboardHeader;

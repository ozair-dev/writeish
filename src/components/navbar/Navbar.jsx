import React from "react";
import { Link } from "react-router-dom";

import Profile from "./Profile";
import ToggleDarkMode from "./ToggleDarkMode";

const Navbar = () => {
  return (
    <div
      className={`sticky top-0 w-full p-1 bg-emerald-400 dark:bg-slate-700 shadow-md shadow-gray-400 rounded-lg flex items-center justify-between z-20`}
    >
      <Link to="/">
        <p className="font-rubik text-white text-4xl font-semibold p-1">
          Writeish
        </p>
      </Link>
      <div className="px-1 flex items-center">
        <Profile />
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Navbar;

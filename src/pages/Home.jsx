import React from "react";
import { Link } from "react-router-dom";

import { BsPenFill } from "react-icons/bs";

import FiltersDropdown from "../components/home/FiltersDropdown";
import Documents from "../components/home/Documents";

const Home = () => {
  return (
    <div>
      <div className="mt-4 flex justify-between">
        <FiltersDropdown />

        <Link to="edit">
          <span className="p-2 rounded-md text-emerald-600 dark:text-white font-medium bg-emerald-50 dark:bg-slate-700">
            ADD DOCUMENT
            <BsPenFill className="inline-block ml-2" />
          </span>
        </Link>
      </div>

      <Documents />
    </div>
  );
};

export default Home;

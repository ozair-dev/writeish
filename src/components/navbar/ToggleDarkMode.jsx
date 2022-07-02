import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { toggleDarkMode } from "../../reducer/settings/actions";
import { selectDarkMode } from "../../reducer/settings";

const ToggleDarkMore = () => {
  const dispatch = useDispatch();

  const dark = useSelector(selectDarkMode);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  }, [dark]);

  return (
    <div
      onClick={() => dispatch(toggleDarkMode())}
      className="h-6 w-12 ml-5 rounded-full bg-emerald-500 dark:bg-slate-900 relative"
    >
      <div className="h-full w-6 bg-yellow-300 rounded-full absolute transition-right duration-500 dark:right-2 dark:bg-transparent dark:shadow-moon dark:shadow-white"></div>
    </div>
  );
};

export default ToggleDarkMore;

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { setFilters } from "../../reducer/settings/actions";

const FilterButton = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-emerald-500 dark:bg-slate-700 text-white font-medium my-px p-1 rounded"
  >
    {children}
  </button>
);

const FiltersDropdown = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (field, order) => () => {
    dispatch(setFilters({ field, order }));
  };

  return (
    <div onClick={() => setOpen((p) => !p)} className="relative">
      <button className="p-1 text-emerald-500 dark:text-white font-semibold underline">
        Set Filters
      </button>

      <div
        className={`absolute bg-white rounded-md z-10 w-max flex flex-col transition-all overflow-hidden ${
          open ? "max-h-screen p-0.5" : "max-h-0"
        }`}
      >
        <FilterButton onClick={handleClick("createdAt", -1)}>
          Date Created (newest)
        </FilterButton>
        <FilterButton onClick={handleClick("createdAt", 1)}>
          Date Created (oldest)
        </FilterButton>
        <FilterButton onClick={handleClick("lastModified", -1)}>
          Date Modified (newest)
        </FilterButton>
        <FilterButton onClick={handleClick("lastModified", 1)}>
          Date Modified (oldest)
        </FilterButton>
      </div>
    </div>
  );
};

export default FiltersDropdown;

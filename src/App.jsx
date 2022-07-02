import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { initializeDocuments } from "./reducer/documents/actions";
import { selectFilters } from "./reducer/settings";
import { selectUser } from "./reducer/user";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import EditDocument from "./pages/EditDocument";
import Preview from "./pages/Preview";

function App() {
  const dispatch = useDispatch();

  const filters = useSelector(selectFilters);
  const limit = useSelector((state) => state.documents.limit);
  const user = useSelector(selectUser);

  useEffect(() => {
    let unsub;

    if (user) {
      unsub = dispatch(initializeDocuments(limit, user.uid));
    }

    return unsub;
  }, [filters, user, limit, dispatch]);

  return (
    <div className="App p-2 min-h-screen dark:bg-slate-500 transition-colors">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="edit" element={<EditDocument />} />
        <Route path="edit/:id" element={<EditDocument />} />
        <Route path="preview/:id" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;

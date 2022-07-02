import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { FaUserCircle } from "react-icons/fa";

import { selectUser } from "../../reducer/user";

import { signInWithGoogle, signOutUser } from "../../utils/firebase.utils";

const Button = ({ onClick, children, open }) => (
  <button
    onClick={onClick}
    className={`absolute bg-white border-emerald-500 transition-all overflow-hidden ${
      open ? "max-h-100 p-1 border" : "max-h-0 p-0"
    } dark:border-slate-700 rounded`}
  >
    {children}
  </button>
);

const Profile = () => {
  const [open, setOpen] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    setOpen(false);
  }, [user]);

  return (
    <div className="relative">
      <FaUserCircle
        onClick={() => setOpen((p) => !p)}
        className="text-3xl text-white"
      />
      {user ? (
        <Button open={open} onClick={signOutUser}>
          Logout
        </Button>
      ) : (
        <Button open={open} onClick={signInWithGoogle}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Profile;

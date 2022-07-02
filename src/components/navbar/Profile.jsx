import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { FaUserCircle } from "react-icons/fa";

import { selectUser, selectUserStatus } from "../../reducer/user";

import { signInWithGoogle, signOutUser } from "../../utils/firebase.utils";

const ProfileButton = ({ onClick, children, open }) => (
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

  const userStatus = useSelector(selectUserStatus);

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
        <ProfileButton open={open} onClick={signOutUser}>
          Logout
        </ProfileButton>
      ) : (
        <ProfileButton open={open} onClick={signInWithGoogle}>
          Login
        </ProfileButton>
      )}
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
// import { useTips } from "../context/TipsContext";
import Privateroute from "./Privateroute";
import { useAuth } from "../context/Authcontext";
import { PiTreePalmFill } from "react-icons/pi";

const AllLinks = () => {
  const { user } = useAuth();
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore">Explore Gardeners</NavLink>
      </li>
      <li>
        <NavLink to="/tips">Browse Tips</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/sharetips">Share a Garden Tip</NavLink>
          </li>
          <li>
            <NavLink to="/mytips">My Tips</NavLink>
          </li>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  // const navigate = useNavigate();
  // const { user, signoutuser } = useTips();
  const { user, signoutuser } = useAuth();
  console.log(user);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSignout = () => {
    signoutuser()
      .then(() => {
        console.log("Logged out");
        // navigate("/");
      })
      .catch((error) => console.error("Logout error", error));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <AllLinks user={user} />
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl lg:text-2xl font-bold gap-2">
          <PiTreePalmFill className="text-green-800" />
          <Logo  />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <AllLinks />
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-700 text-xl" />
          )}
        </button>

        {/* Authentication */}
        {!user ? (
          <>
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-outline">
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/S0Q3G6G/default-user.png"
                  }
                  alt="User"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="text-sm px-2 py-1 text-gray-600">
                👤 {user?.displayName || "User"}
              </li>
              <li>
                <button
                  onClick={handleSignout}
                  className="text-red-600 hover:text-white hover:bg-red-500 flex items-center gap-2 px-3 py-1 rounded"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

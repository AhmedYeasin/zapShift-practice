import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink>Service</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink>About Us</NavLink>
      </li>
      <li>
        <NavLink>Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink>Be a Rider</NavLink>
      </li>

      {user && 
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My Parcel</NavLink>
          </li>
        </>
      }
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm rounded my-4">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <section className="flex items-end">
              <Logo />
            </section>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-600">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user ? (
            <a onClick={handleSignOut} className="btn outline bg-white">
              Sign Out
            </a>
          ) : (
            <Link className="btn" to="/sign-in">
              Sign In
            </Link>
          )}
          <Link
            className="btn btn-primary rounded-xl text-black "
            to="/beRider"
          >
            Be a Rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

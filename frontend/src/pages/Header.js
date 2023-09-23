import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";
import {Auth} from "../AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Header() {
  const {user} = useContext(Auth)
  // console.log(user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to={"/"}>
          Blog App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          {user && user ? <>
            <li className="`nav-item ">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">
                Home Blog
              </NavLink>
            </li>
            <li className="`nav-item ">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/myBlogs">
                MyBlogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/create-blog">
                Create Blog
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/usersList">
                UserList
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/followerList">
                Follower List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/followingList">
                Following List
              </NavLink>
            </li>
            <li className="nav-item">
            <LogoutButton />
            </li>
          </>:<>
          <li className="`nav-item ">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/register">
                Register
              </NavLink>
            </li>
            <li className="`nav-item ">
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/login">
                Login
              </NavLink>
            </li>
          </>}
          </ul>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Header;

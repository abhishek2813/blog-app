import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoutButton from '../component/LogoutButton'
function Header() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to={"/"}>Blog App</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="`nav-item " >
        <Link className="nav-link" to="/myBlogs">MyBlogs</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/create-blog">Create Blog</Link>
      </li>
      <li className="nav-item dropdown">
      <Link className="nav-link" to="/usersList">UserList</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/followerList">Follower List</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/followingList">Following List</Link>
      </li>
    </ul>
    <div className='my-2 my-lg-0'>
    <LogoutButton />
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header
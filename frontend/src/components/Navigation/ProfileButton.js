// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import droppie from './Images/droppie.png'

function ProfileButton({ user, setLogin, setShowModal }) {
  // const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // useEffect(() => {
  //   console.forceUpdate();
  // }, [user])

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

  };

  // console.log('user ====', user)

  return (
    <>
      <div className="dropdown">
        <button className='user-circle' onClick={openMenu}>
          <i className="fas fa-bars" />
          <i className="fas fa-user-circle" />
          {/* <img src={droppie} alt='drop-down'></img> */}
          </button>
          </div>
        {showMenu && (user ?
          (<ul className="profile-dropdown">
            <li className="username-email" key={user.username}>{user.user ? user.user.username : user.username}</li>
            <li className="username-email" key={user.email}>{user.user ? user.user.email : user.email}</li>
            {/* <li> */}
              <button className="logout" onClick={logout}>Log Out</button>
            {/* </li> */}
          </ul>) :
          (<div className="main-login-dropdown-div">
            <ul className='login-signup-dropdown'>
              <li>
                <button className='login-logout-buttons' onClick={() => {
                  setLogin(true)
                  setShowModal(true)
                }}>
                  Log In
                </button>
              </li>
              <li>
                <button className='login-logout-buttons' onClick={() => {
                  setLogin(false)
                  setShowModal(true)
                }}>
                  Sign Up
                </button>
              </li>
            </ul>
          </div>)
        )}
    </>
  );
}

export default ProfileButton;

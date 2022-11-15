// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage'
import { Modal } from '../../context/Modal'
import logo from './Images/logo.png'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <div className='modalNavBar' >
      <NavLink exact to="/" >
        <img src={logo} alt='logo' id='logo'></img>
      </NavLink>
        <li>
          <div id='createASpot'>
            {sessionUser &&
              <div >
                <NavLink to='/spots'>
                  Become a Host
                </NavLink>
              </div>}
          </div>
          {isLoaded && (
            <ProfileButton
              user={sessionUser}
              setLogin={setLogin}
              setShowModal={setShowModal}
            />
          )}
        </li>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          {login ? <LoginForm setShowModal={setShowModal} /> :
            <SignupFormPage setShowModal={setShowModal} />}
        </Modal>
      )}
    </div>
  );
}

export default Navigation;

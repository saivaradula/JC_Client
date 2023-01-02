import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

import { Link, Redirect } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../constants/actionTypes'
require('dotenv').config()

const Navbar = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }


  const history = useHistory();
  const signOut = () => {
    dispatch({
      type: actions.LOGOUT,
    });
    history.push("/login");
  }

  const lockScreen = () => {
    history.push("/user-pages/lockscreen");
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        {/* <Link className="navbar-brand brand-logo" to="/"><img src={require('../../assets/images/logo.svg')} alt="logo" /></Link> */}
        {/* <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></Link> */}
        <Link className="navbar-brand brand-logo" to="/">JC</Link>
        <Link className="navbar-brand brand-logo-mini" to="/">JC</Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <span className="mdi mdi-menu"></span>
        </button>
        <div className="search-field d-none d-md-block">
          {/* <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="input-group-text border-0 mdi mdi-magnify"></i>
              </div>
              <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
            </div>
          </form> */}
        </div>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link">
                <div className="nav-profile-img">

                  <img src={user.profile_image !== '' ? user.profile_image : process.env.REACT_APP_DEFAULT_PROFILE_PIC} alt="user" />

                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black"><Trans>{user.name}( {user.user_role} )</Trans></p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown">

                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()}>
                  <i className="mdi mdi-cached mr-2 text-success"></i>
                  <Link to="/profile">
                    <Trans>Profile</Trans>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => lockScreen()}>
                  <i className="mdi mdi-lock mr-2 text-primary"></i>
                  <Trans>Lock Screen</Trans>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => signOut()}>
                  <i className="mdi mdi-logout mr-2 text-primary"></i>
                  <Trans>Signout</Trans>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="!#" onClick={() => signOut()}>
              <i className="mdi mdi-power"></i>
            </a>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

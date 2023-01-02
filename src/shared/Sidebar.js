import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
require('dotenv').config()
// import { useDispatch, useSelector } from "react-redux";

class Sidebar extends Component {

  user = {}
  state = {
    // user: useSelector(state => state.auth)
  };
  // const { user } = useSelector(state => state.auth);

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/orders', state: 'ordersMenuOpen' },
      { path: '/staff', state: 'staffMenuOpen' },
      { path: '/models', state: 'modelsMenuOpen' },
      { path: '/customers', state: 'customerMenuOpen' },

      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/maps', state: 'mapsMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/general-pages', state: 'generalPagesMenuOpen' },
      { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
              <div className="nav-profile-image">
                {/* <img src={user.profile_image !== '' ? user.profile_image : process.env.REACT_APP_DEFAULT_PROFILE_PIC} alt="profile" /> */}
                <img src={process.env.REACT_APP_DEFAULT_PROFILE_PIC} alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>Admin</Trans></span>
                <span className="text-secondary text-small"><Trans>Project Manager</Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={this.isPathActive('/home') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/home">
              <span className="menu-title"><Trans>Home</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/staff') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.staffMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('staffMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Staff</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-arrow-right menu-icon"></i>
            </div>
            <Collapse in={this.state.staffMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/staff/add-staff') ? 'nav-link active' : 'nav-link'} to="/staff/add-staff"><Trans>Add Staff</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/staff/list') ? 'nav-link active' : 'nav-link'} to="/staff/list"><Trans>List</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/customers') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.customerMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
              onClick={() => this.toggleMenuState('customerMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Customers</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-arrow-left menu-icon"></i>
            </div>
            <Collapse in={this.state.customerMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/customers/add') ? 'nav-link active' : 'nav-link'} to="/customers/add"><Trans>Add</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/customers/list') ? 'nav-link active' : 'nav-link'} to="/customers/list"><Trans>List</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/orders') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.ordersMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('ordersMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Orders</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-animation menu-icon"></i>
            </div>
            <Collapse in={this.state.ordersMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/orders/add-orders') ? 'nav-link active' : 'nav-link'} to="/orders/add-orders"><Trans>Add Orders</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/orders/my-orders') ? 'nav-link active' : 'nav-link'} to="/orders/my-orders"><Trans>My Orders</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/orders/view-orders') ? 'nav-link active' : 'nav-link'} to="/orders/view-orders"><Trans>View Orders</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          <li className={this.isPathActive('/models') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.modelsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('modelsMenuOpen')} data-toggle="collapse">
              <span className="menu-title"><Trans>Models</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-briefcase-edit menu-icon"></i>
            </div>
            <Collapse in={this.state.modelsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/models/new-model') ? 'nav-link active' : 'nav-link'} to="/models/new-model"><Trans>New Model</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/models/view-models') ? 'nav-link active' : 'nav-link'} to="/models/view-models"><Trans>View Models</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);
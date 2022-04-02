import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Backdrop from "../../components/AllProducts/Backdrop";

const SidebarMain = () => {
  const mainmenuRef = useRef(null);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const showHideFilter = () => {
    mainmenuRef.current.classList.toggle("active");
    setDrawerIsOpen(true);
  };

  const HideFilter = () => {
    mainmenuRef.current.classList.toggle("active");
    setDrawerIsOpen(false);
  };

  const closeDrawerHandler = () => {
    showHideFilter();
    setDrawerIsOpen(false);
  };

  return (
    <>
      <div className="user__dashboard__icon" onClick={() => showHideFilter()}>
        <i className="fa fa-indent menu-icon" /> <span>Menu</span>
      </div>
      <div className="user_dashboard__menu" ref={mainmenuRef}>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        <Nav variant="pills" className="dash_pills">
          <div className="user_dashboard__heading_bar">
              <h4 className="user_dashboard__menu_title">My Dashboard</h4>
            <span className="user_dashboard__menu_close" onClick={() => HideFilter()}>
              <i className="fa fa-times" />
            </span>
          </div>
          {/* <Title title="USER MENU" /> */}

          <ul className="menu-list">
            <li className="nav-item">
              <p className="sidebarmain-heading">
                <span>
                  <i className="fa fa-th-large" />
                </span>
                Dashboard
              </p>
              <ul>
                <li>
                  <NavLink exact to="/my-account" className="nav-link">
                    <i className="fa fa-cubes" aria-hidden="true"></i>
                    <span>My Dashboard</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <p className="sidebarmain-heading">
                <span>
                  <i className="fa fa-user" />
                </span>
                My Account
              </p>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/my-account/my-profile"
                    className="nav-link"
                  >
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/my-account/change-password"
                    className="nav-link"
                  >
                    <i className="fa fa-key" aria-hidden="true"></i>
                    <span>Change Password</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/my-account/saved-address"
                    className="nav-link"
                  >
                    <i className="fa fa-list-alt" />
                    <span>Saved Address</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <p className="sidebarmain-heading">
                <span>
                  <i className="fa fa-shopping-cart" />
                </span>
                Manage Orders
              </p>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/my-account/order-list"
                    className="nav-link"
                  >
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                    <span>My Orders</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <p className="sidebarmain-heading">
                <span>
                  <i className="fa fa-pencil-square" />
                </span>
                Manage Reviews & Ratings
              </p>
              <ul>
                <li>
                  <NavLink exact to="/my-account/ratings" className="nav-link">
                    <i className="fa fa-comments-o" aria-hidden="true"></i>
                    <span>Reviews & Ratings</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <p className="sidebarmain-heading">
                <span>
                  <i className="fa fa-ticket" />
                </span>
                Support
              </p>
              <ul>
                <li>
                  <NavLink exact to="/my-account/helpdesk" className="nav-link">
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <span>Help Desk</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </Nav>
      </div>
    </>
  );
};

export default SidebarMain;

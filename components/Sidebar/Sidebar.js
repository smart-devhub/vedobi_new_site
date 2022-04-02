import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
import NavMenu from "../header/NavMenu";

const Sidebar = () => {
  const { triggerMobileMenu } = useSelector((state) => state.sidebar);
  
  useEffect(() => {
    const offCanvasNav = document.querySelector("#offcanvas-navigation");
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(".sub-menu");

    const anchorLinks = offCanvasNav.querySelectorAll("a");
   
    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }
    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;
    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }
    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        closeMobileMenu();
      });
    }

  });
  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(".sidebar__content");
    const offcanvasMobileMenuOverlay = document.querySelector(".sidebar");
    var body = document.getElementsByTagName("BODY")[0];
    offcanvasMobileMenu.classList.remove("sidebar__content--show");
    offcanvasMobileMenuOverlay.classList.remove("sidebar--show");
    body.classList.remove("overlayToggle");

  };
return (

  
    <div className={`${triggerMobileMenu ? "sidebar sidebar--show" : "sidebar"}`} >
      <div className="toggle-backdrop" onClick={closeMobileMenu}></div>
      <div
        id="offcanvas-navigation"
        className={`${
          triggerMobileMenu
            ? "sidebar__content sidebar__content--show"
            : "sidebar__content offcanvas-navigation"
        }`}
      >
        <div className="menu-header">
          <h4 className="menu-title">Menu</h4>
          <span className="close-icon"  onClick={closeMobileMenu}>
            <i className="pe-7s-close"></i>
          </span>
        </div>
      
        <NavMenu /> 
      </div>
    </div>
  );
};

export default Sidebar;

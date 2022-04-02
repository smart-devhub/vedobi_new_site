import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/global";
import {
  fetchAllCategories,
  fetchCategory,
  updateCurrentLocation,
} from "../../redux/products/products_actions";
import { toggleSidebar } from "../../redux/sidebar/sidebar_actions";
import axios from "axios";
import ReactGA from "react-ga";

const NavMenu = () => {
  const categories = useSelector((state) => state.products.allCategories);
  const { sidebarOpen } = useSelector((state) => state.sidebar);
   const [toggle] = useState(false);
  const [elem, setElem] = useState("");

  const { user, currentLocationHistory } = useSelector(
    (state) => state.products
  );
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const pathname = window.location.href;

  useEffect(() => {
     if (pathname && currentLocationHistory) {
      const ifAny = currentLocationHistory.find((a) => a.path === pathname);

      if (!ifAny) {
        const uDetails = {
          email: user ? user.email : "",
          phone: user ? user.v_m_number : "",
          username: user ? user.name : "",
          user_id: user ? user?.id : "",
          path: pathname,
           // latitude: currentLocationHistory[0].latitude,
          // IPv4: currentLocationHistory[0].IPv4,
          // country_name: currentLocationHistory[0].country_name,
          // longitude: currentLocationHistory[0].longitude,
        };
        dispatch(updateCurrentLocation(uDetails));

        ReactGA.pageview(pathname);
        const uri = baseUrl + "api/UserLogvisiter";
        axios.post(uri, uDetails).then((resp) => {
          // console.log('resp',resp);
        });
      }
    }
  }, [user, pathname]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchAllCategories());
      dispatch(fetchCategory());
    }
  }, [dispatch, categories]);

  const handleSubmenu = () => {
    if (elem) {
      elem.style.display = "none";
      setElem("");
      dispatch(toggleSidebar(false));
    }
  };

  const createSubMenu = (catUrl, subMenu) => {
    return subMenu.map((subMenuData) => (
      <li key={subMenuData?.sub_id}>
        <Link
          onClick={handleSubmenu}
          to={`/collections/${subMenuData?.cat_url}/${subMenuData?.subcat_url}`}
        >
          {subMenuData?.sub_name}
        </Link>
      </li>
    ));
  };

  useEffect(() => {
    if (elem && sidebarOpen) {
      // elem.style.position = 'relative';
      elem.style.display = "block";
      // elem.style.transform = 'rotateX(0deg)';
      // elem.style.visibility = 'visible';
      // menuRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (elem && !sidebarOpen) {
      // elem.style.position = 'absolute';
      elem.style.display = "block";
      elem.style.visibility = "visible";
    }
  }, [elem, sidebarOpen, toggle]);

  const handleMenu = (e) => {
    if (e) {
      const subMenu = e?.target?.children[1];
      if (elem) {
        if (subMenu === elem) {
          elem.style.display = "none";
          setElem("");
        } else {
          elem.style.display = "none";
          setElem(subMenu);
        }
      } else {
        setElem(subMenu);
      }
    }
  };
  const handleOnMouseOver = (e) => {
    const subMenu = e?.target?.children[1];
    if (!sidebarOpen && subMenu) {
      if (elem === subMenu) {
        // setToggle(!toggle)
      } else {
        setElem(subMenu);
      }
    }
  };

  const createMenu = (menuData) => {
    return (
      <li key={menuData?.cat_id}>
        {menuData?.submenu.length > 0 ? (
          <span onClick={handleMenu} onMouseOver={handleOnMouseOver}>
            {menuData?.cat_name}
            <i className="fa fa-angle-down" />
            <ul className="submenu">
              {createSubMenu(menuData?.cat_url, menuData?.submenu)}
            </ul>
          </span>
        ) : (
          <>
            <Link to={`/collections/${menuData?.cat_url}`}>
              {menuData?.cat_name}
            </Link>
          </>
        )}
      </li>
    );
  };

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li style={{ width: 0, height: 0, visibility: "hidden" }}>
            <div style={{ width: 0, height: 0 }} ref={menuRef} />
          </li>
          {categories?.MainMenu?.map(createMenu)}
          <li>
            <Link to="/blogs/ayurveda-book">Ayurveda Care</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(NavMenu);

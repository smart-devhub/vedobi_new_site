import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Backdrop from './Backdrop'

const ShopSidebar = ({ products, getSortParams, categoryValues = [] }) => {
  
  const { categoryFilter } = useSelector((state) => state.products);
  const rangeSelector = (min1, max1) => {
    getSortParams("price", { min: min1, max: max1 });
  };
  
  const RatingSelector = (min1, max1) => {
    getSortParams("rating", { min: min1, max: max1 });
  };
  
  const filterRef = useRef(null);
  const[drawerIsOpen, setDrawerIsOpen] = useState(false);
  const showHideFilter = () => {
    filterRef.current.classList.toggle('active')
    setDrawerIsOpen(true);
  }
  
  const HideFilter = () => {
    filterRef.current.classList.toggle('active')
    setDrawerIsOpen(false);
  }
  
  const closeDrawerHandler = () =>{
    showHideFilter();
    setDrawerIsOpen(false);
  }
  
  return (
    <>
    <div className="catalog__filter" ref={filterRef} >
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
      <div className="sidebar-widget">  
        <h4 className="pro-sidebar-title">Filter</h4>
        <div className="sidebar-widget-list">
          <h3>Categories</h3>
          {categoryFilter ? (
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    className={
                      categoryValues.length === 1 && categoryValues.includes("")
                        ? "active"
                        : ""
                    }
                    onClick={(e) => {
                      getSortParams("category", "");
                      // setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> All Categories
                  </button>
                </div>
              </li>
              {categoryFilter.map((category, key) => {
                return (
                  <li key={key}>
                    <div className="sidebar-widget-list-left">
                      <button
                        className={
                          categoryValues.includes(category.cat_name)
                            ? "active"
                            : ""
                        }
                        onClick={(e) => {
                          getSortParams("category", category.cat_name);
                          // setActiveSort(e);
                        }}
                      >
                        {" "}
                        <span className="checkmark" /> {category.cat_name}{" "}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            "No categories found"
          )}
        </div>

        <div className="sidebar-widget-list">
          <h3>Rating</h3>
          <ul>
            <li
              onClick={(e) => {
                RatingSelector(4, 5);
              }}
            >
              <label htmlFor="fourup">
                <input type="radio" name="ratingstar" value="1" id="fourup" />
                <span className="icons">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star-o"></i> & up{" "}
                </span>
              </label>
            </li>
            <li
              onClick={(e) => {
                RatingSelector(3, 3.9);
              }}
            >
              <label htmlFor="threeup">
                <input type="radio" name="ratingstar" value="2" id="threeup" />
                <span className="icons">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i> & up{" "}
                </span>
              </label>
            </li>
            <li
              onClick={(e) => {
                RatingSelector(2, 2.9);
              }}
            >
              <label htmlFor="twoup">
                <input type="radio" name="ratingstar" value="3" id="twoup" />
                <span className="icons">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i> & up{" "}
                </span>
              </label>
            </li>
            <li
              onClick={(e) => {
                RatingSelector(1, 1.9);
              }}
            >
              <label htmlFor="oneup">
                <input type="radio" name="ratingstar" value="4" id="oneup" />
                <span className="icons">
                  <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <i className="fa fa-star-o"></i> & up{" "}
                </span>
              </label>
            </li>
          </ul>
        </div>

        <div className="sidebar-widget-list">
          <h3>Price</h3>
          <ul>
            <li
              onClick={(e) => {
                rangeSelector(200, 499);
              }}
            >
              <label htmlFor="price1">
                <input type="radio" name="sidebarprice" value="1" id="price1" />
                Rs. 200 - Rs. 499
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(500, 999);
              }}
            >
              <label htmlFor="price2">
                <input type="radio" name="sidebarprice" value="1" id="price2" />
                Rs. 500 - Rs. 999
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(1000, 1499);
              }}
            >
              <label htmlFor="price3">
                <input type="radio" name="sidebarprice" value="1" id="price3" />
                Rs. 1000 - Rs. 1499
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(1500, 1999);
              }}
            >
              <label htmlFor="price4">
                <input type="radio" name="sidebarprice" value="1" id="price4" />
                Rs. 1500 - Rs. 1999
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(2000, 2499);
              }}
            >
              <label htmlFor="price5">
                <input type="radio" name="sidebarprice" value="1" id="price5" />
                Rs. 2000 - Rs. 2499
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(2500, 2999);
              }}
            >
              <label htmlFor="price6">
                <input type="radio" name="sidebarprice" value="1" id="price6" />
                Rs. 2500 - Rs. 2999
              </label>
            </li>
            <li
              onClick={(e) => {
                rangeSelector(3000, 10000);
              }}
            >
              <label htmlFor="price7">
                <input type="radio" name="sidebarprice" value="1" id="price7" />
                Rs. 3000+{" "}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="catalog_filter_close">
        <button className="btn btn-cancel" onClick={() => HideFilter()}>Cancel</button>
        <button className="btn btn-ok" onClick={() => HideFilter()}>Ok</button>
        </div>
    </div>
    <button className="btn btn-filter mb-3" onClick={() => showHideFilter()}>Filter now&nbsp;<i className="fa fa-filter"></i></button>
    </>
  );
};

export default ShopSidebar;

import React, { useState, useRef,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchBlogList,fetchBlogViewCount,fetchBlogTopTen } from "../../redux/products/products_actions";
import { useDispatch ,useSelector} from "react-redux";
import Backdrop from '../../components/AllProducts/Backdrop'

const BlogSidebar = ({ SideBarPost }) => {
  const [searchShowPost, setsearchShowPost] = useState(false);
  const { TopTenBlog } = useSelector((state) => state.products);

  // const searchHideSideBar = () => {

  // }
  const blogRef = useRef(null);
  const dispatch = useDispatch();
  let history = useHistory();
  const [name, setName] = useState("");
  const submitHandlerSearchPost = (e) => {
    e.preventDefault();
    dispatch(fetchBlogList(name, history));
        
  };
  useEffect(() => {
    dispatch(fetchBlogTopTen());
  }, [dispatch])

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const showHideFilter = () => {
    blogRef.current.classList.toggle('active')
    setDrawerIsOpen(true);
  }

  const HideFilter = () => {
    blogRef.current.classList.toggle('active')
    setDrawerIsOpen(false);
  }

  const closeDrawerHandler = () => {
    showHideFilter();
    setDrawerIsOpen(false);
  }
  const handleViewCount = (id) => {
    dispatch(fetchBlogViewCount(id));
  }

  return (
    <>
      <div className="blog-filter-icon mb-3" onClick={() => showHideFilter()}><i className="pe-7s-edit"></i><span>Filter</span></div>
      <div className="catalog__filter" ref={blogRef} >
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        <div className="sidebar-style">
          <div className="catalog_filter_close">
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => HideFilter()}></i>
          </div>
          <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-55 mt-25">
              <form className="pro-sidebar-search-form" onSubmit={submitHandlerSearchPost}>
                <input type="text" placeholder="Search here..." name="q" id="q" onChange={(e) => setName(e.target.value)} />
                <button type="submit" onClick={() => setsearchShowPost(!searchShowPost)}>
                  <i className="pe-7s-search" />
                </button>
              </form>
            </div>
          </div>
          <div className="sidebar-widget mt-35">
            <h4 className="pro-sidebar-title">Top 10 Read Blog Posts</h4>
            <div className="sidebar-project-wrap mt-30">
              {TopTenBlog.map((ViewCountpostData, index) => {
                return (
                  <div className="single-sidebar-blog" key={index}>
                    <div className="sidebar-blog-img">
                      <Link to={`/blogs/ayurveda-book/${ViewCountpostData.url}`} onClick={() => handleViewCount(ViewCountpostData.id)}>
                        <img
                          height={ViewCountpostData.small_image.height}
                          width={ViewCountpostData.small_image.width}
                          src={ViewCountpostData.small_image}
                          alt={ViewCountpostData.title}
                          effect="blur"
                        />
                      </Link>
                    </div>
                    <div className="sidebar-blog-content">
                      <span>{ViewCountpostData.create_at}</span>
                      <h4>
                        <Link to={`/blogs/ayurveda-book/${ViewCountpostData.url}`} onClick={() => handleViewCount(ViewCountpostData.id)}>
                          {ViewCountpostData.title} 
                        </Link>
                      </h4>
                      <p className="blog-read-count">Read Count : <span className="badge badge-pill">{ViewCountpostData.countview}</span></p>
                    </div>
                  </div>
                );
              })
              }
            </div>
          </div>

          <div className="sidebar-widget mt-35">
            <h4 className="pro-sidebar-title">Recent Blog Posts </h4>
            <div className="sidebar-project-wrap mt-30">
              {SideBarPost.map((CurrentpostData, index) => {
                return (
                  <div className="single-sidebar-blog" key={index}>
                    <div className="sidebar-blog-img">
                      <Link to={`/blogs/ayurveda-book/${CurrentpostData.url}`} onClick={() => handleViewCount(CurrentpostData.id)}>
                        <img
                          height={CurrentpostData.small_image.height}
                          width={CurrentpostData.small_image.width}
                          src={CurrentpostData.small_image}
                          alt={CurrentpostData.title}
                          effect="blur"
                        />
                      </Link>
                    </div>
                    <div className="sidebar-blog-content">
                      <span>{CurrentpostData.create_at}</span>
                      <h4>
                        <Link to={`/blogs/ayurveda-book/${CurrentpostData.url}`} onClick={() => handleViewCount(CurrentpostData.id)}>
                          {CurrentpostData.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BlogSidebar;

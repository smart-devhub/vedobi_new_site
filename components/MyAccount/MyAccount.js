import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SidebarMain from "./SidebarMain";
import { ImgUrl } from '../../utils/global';
import userImg from '../../assets/images/user-img.webp'


function MyAccount() {

  const { user } = useSelector((state) => state.products);

  return (

      <>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="breadcrumb-content">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="fa fa-home home--icon" />
                        </Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">My Account</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-account-area pt-30 pb-50 my-2 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="account-sidebar">
                  <div id="backdrop-hook"></div>
                  <SidebarMain />
                </div>
              </div>

              <div className="col-lg-9">
                <div className="single-account-wrapper">
                  <div className="single-account-wrapper">
                    <h2 className="tabcontent-title">My Account</h2>
                        
                    <div className="account-profile text-center">
                      <div className="img-area">
                        <div className="inner-area">
                          {user.profile_pic !=='' && user.profile_pic !==null ? (
                            <img
                            src={ImgUrl+user.profile_pic} 
                            alt="user name"
                            className="img-fluid"
                          />
                          ): (
                            <img
                            src={userImg} 
                            alt="user name"
                            className="img-fluid"
                          />
                          )}
                        
                        </div>
                      </div>
                      
                      
                      <div className="profile-data">
                        <h5>{user.v_f_name}&nbsp;{user.v_l_name}</h5>
                        <p>{user.v_m_number}</p>
                        <p>{user.email}</p>
                        <div className="profile-edit"><Link to="/my-account/my-profile"><i className="fa fa-edit"></i></Link></div>
                      </div>
                    </div>
                    <div className="simplified_main-box">
                      
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i className="fa fa-cubes" aria-hidden="true" />
                          </div>
                          <h5 className="card-name">Order`s Manage</h5>
                        </div>
                        <div className="card-info">
                          <Link to="/my-account/order-list" className="card-link">
                            View Now
                          </Link>
                        </div>
                      </div>
                      {/* <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <FaTags />
                          </div>
                          <h5 className="card-name">User Grade</h5>
                        </div>
                        <div className="card-info">
                          <Link to="/" className="card-link">
                            View Now
                          </Link>
                        </div>
                      </div> */}
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i className="fa fa-list-alt" ara-hidden="true"/>
                          </div>
                          <h5 className="card-name">Saved Address</h5>
                        </div>
                        <div className="card-info">
                          <Link to="/my-account/saved-address" className="card-link">
                            View Now
                          </Link>
                        </div>
                      </div>
                      {/* <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <MdRateReview />
                          </div>
                          <h5 className="card-name">Review & Ratings</h5>
                        </div>
                        <div className="card-info">
                          <Link to="/review-rating"
                            className="card-link"
                          >
                            View Now
                          </Link>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <BiWalletAlt />
                          </div>
                          <h5 className="card-name">Wallet</h5>
                        </div>
                        <div className="card-info">
                          <Link
                            to="/wallet"
                            className="card-link"
                          >
                            View Now
                          </Link>
                        </div>
                      </div> */}
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i className="fa fa-key" aria-hidden="true" />
                          </div>
                          <h5 className="card-name">Change Password</h5>
                        </div>
                        <div className="card-info">
                          <Link to="/my-account/change-password" className="card-link">
                            View Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default React.memo(MyAccount);

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../utilities/useAuth";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Helmet } from "react-helmet-async";

const PageLayout = ({ pageTitle, children }) => {
  const { user, authenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const is_admin = user && user.is_admin ? "| Admin" : "";
  return (
    <div className="vh-100 d-flex flex-column">
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <Helmet>
              <title>{pageTitle}</title>
            </Helmet>
            <Link
              className="navbar-brand"
              replace
              to={`${
                user && user.is_admin ? "/admin/dashboard" : "/dashboard"
              }`}
            >
              E-Learning System {is_admin}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                {user && user.is_admin ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        replace
                        to="/admin/dashboard"
                      >
                        Lessons
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" replace to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        replace
                        to="/user/lessons"
                      >
                        Lessons
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    replace
                    to={`/profile/${user.id}`}
                  >
                    Profile
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                {authenticated && (
                  <div className="d-flex">
                    <img
                      src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
                      width="45"
                      alt="user-profile"
                      height="45"
                      style={{ objectFit: "cover" }}
                      className="rounded-circle border me-2 border-3 border-white"
                    />
                    <div className="d-inline my-auto">
                      <DropdownButton
                        align="end"
                        title={user && user.name}
                        id="dropdown-menu-align-end"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          onClick={() => navigate(`/profile/${user.id}`)}
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => navigate(`/profile/settings`)}
                        >
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onClick={() => signOut()}>
                          Logout
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-shrink-0">
        <div className="container mt-5">
          <div className="p-4">{children}</div>
        </div>
      </main>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">ELearning | Oliverio &copy; 2022</span>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;

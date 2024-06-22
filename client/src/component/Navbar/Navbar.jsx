import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import metmaskContext from "../../context";
import { getAntiqueCategories } from "../../utilities/interact";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const account = useContext(metmaskContext); // pass import value
  const { accounts, connectAccount } = account;
  const [isConnectedAccount, setIsConnectedAccount] = useState(false); // pass import value
  let isLogged = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (accounts) {
      setIsConnectedAccount(true);
    } else {
      setIsConnectedAccount(false);
    }
  }, [accounts]);

  // Inside the useEffect hook
  useEffect(() => {
    // Fetch antique categories when the component mounts
    async function fetchCategories() {
      try {
        const fetchedCategories = await getAntiqueCategories();
        // Remove duplicates from categories
        const uniqueCategories = Array.from(new Set(fetchedCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching antique categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isLogged?.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [isLogged]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand bg-dark">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex d-flex justify-content-center"
            id=""
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Collections
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        className="dropdown-item text-dark"
                        to={`/AntiqueListByCategories/${category}`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Campaigns">
                  Campaigns
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/AboutUs">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white text-white"
                  to="/ContactUs"
                >
                  Contact Us
                </Link>
              </li>
              {user ? (
                <li className="nav-item" onClick={handleLogout}>
                  <a className="nav-link text-white" href="/">
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/Login">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/SignUp">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div></div>
            <form className="d-flex " style={{ marginRight: "1rem" }}>
              {user && (
                <div>
                  <Link to="/Admin" className="w-75 ">
                    <i
                      className="far fa-user-circle mt-2 pt-1"
                      style={{ color: "white" }}
                    ></i>
                  </Link>
                </div>
              )}
              <div style={{ marginLeft: "25px" }}>
                {isConnectedAccount ? (
                  <button className="btn btn-dark text-white">Connected</button>
                ) : (
                  <button
                    onClick={connectAccount}
                    className="btn btn-dark text-white"
                  >
                    Connect wallet
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

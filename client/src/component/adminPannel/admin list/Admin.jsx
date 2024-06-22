import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Antique from "../Antique/Antique";
import "./Style.css";
import Audience from "../crowd sourcing/audience";
const Admin = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="admin-panel">
          <div className="header text-center">
            <h3>Admin Panel</h3>
            <Audience />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Link
                to="/Upload"
                className="btn btn-dark"
                style={{ width: "13rem" }}
              >
                <i className="fa fa-upload"></i> Add Antique
              </Link>
            </div>
            <div>
              <Link
                to="/Campaign"
                className="btn btn-dark"
                style={{ width: "13rem" }}
              >
                <i className="fa fa-bullhorn"></i> Add Campaign
              </Link>
            </div>
            <div>
              <Link
                to="/ShowCompaign"
                className="btn btn-dark"
                style={{ width: "13rem" }}
              >
                <i className="fa fa-eye"></i> Show Campaign
              </Link>
            </div>
            <div>
              <Link
                to="/Users"
                className="btn btn-dark"
                style={{ width: "13rem" }}
              >
                <i className="fa fa-user"></i> Users
              </Link>
            </div>
          </div>
          <Antique />
        </div>
      </div>
    </>
  );
};

export default Admin;
